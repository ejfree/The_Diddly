#!/usr/bin/env perl
use strict; use warnings; use utf8; binmode STDOUT, ':utf8';
use File::Find; use File::Spec; use Encode qw(decode encode);

my $locations_dir = "docs/Io'lokar/Locations";
my $people_dir    = "docs/Io'lokar/People";

sub sluggify {
  my ($s) = @_;
  $s =~ s/^\s+|\s+$//g;
  my $orig = $s;
  $s = lc $s;
  $s =~ s/['`’]//g;
  $s =~ s/[^a-z0-9]+/-/g;
  $s =~ s/-{2,}/-/g;
  $s =~ s/^-|-$//g;
  return $s || 'npc';
}

sub read_file {
  my ($p) = @_;
  open my $fh, '<:raw', $p or die "Cannot open $p: $!\n";
  my $buf = do { local $/; <$fh> }; close $fh;
  return decode('UTF-8', $buf);
}

sub write_file {
  my ($p, $s) = @_;
  open my $fh, '>:raw', $p or die "Cannot write $p: $!\n";
  print $fh encode('UTF-8', $s); close $fh;
}

my %name_to_role;

my @title_prefixes = (
  'Commander','Chancellor','Magistrate','Postmaster','Nexus Master','Conductor','Registrar','Market Warden',
  'Arch-Controller','Assessor Prime','Maestro','Director','High Warden','High Prior','Mistress','Lady','Lord',
  'Dean','Professor','Sister','Captain','Warden','Marshal','Auditor','Proctor','Curator','Archivist','Scribe',
  'Herald','Ordinator','Advocate','Mediator','Inspector','Clerk','Broker','Quartermaster','Dispatcher','Chef',
  'Forge-Lord','MC','Bookrunner','Keywright','Foreman','Factor','Coldkeeper','Seaguard'
);

sub title_from_name {
  my ($name) = @_;
  for my $t (@title_prefixes) {
    my $re = qr/^\Q$t\E\b/i;
    if ($name =~ $re) {
      # Normalize capitalization
      my $norm = $t; $norm =~ s/\b(\w)/uc($1)/eg;
      return $norm;
    }
  }
  return undef;
}

sub pick_role_from_desc {
  my ($desc) = @_;
  my $d = lc($desc // '');
  my @map = (
    [qr/\bpublican\b/, 'Publican'],
    [qr/\bchef-?proprietor\b/, 'Chef-Proprietor'],
    [qr/\bchef\b/, 'Chef'],
    [qr/\bcurator\b/, 'Curator'],
    [qr/\bdispatcher\b/, 'Dispatcher'],
    [qr/\bquartermaster\b/, 'Quartermaster'],
    [qr/\bproprietor\b/, 'Proprietor'],
    [qr/\bforeman\b/, 'Foreman'],
    [qr/\bartisan\b/, 'Artisan'],
    [qr/\btoymaker\b/, 'Toymaker'],
    [qr/\blapidary\b/, 'Lapidary'],
    [qr/\bappraiser\b/, 'Appraiser'],
    [qr/\bwoodwright\b/, 'Woodwright'],
    [qr/\bmason\b/, 'Mason'],
    [qr/\bdesigner\b/, 'Designer'],
    [qr/\bcollector\b/, 'Collector'],
    [qr/\bimpresario\b/, 'Impresario'],
    [qr/\blounge-?keeper\b/, 'Lounge Keeper'],
    [qr/\btapmaster\b/, 'Tapmaster'],
    [qr/\bbarkeep\b/, 'Barkeep'],
    [qr/\bhealer\b/, 'Healer'],
    [qr/\bapothecary\b/, 'Apothecary'],
    [qr/\balchemist\b/, 'Alchemist'],
    [qr/\bjeweler\b/, 'Jeweler'],
    [qr/\bstationer\b/, 'Stationer'],
    [qr/\bwardwright\b/, 'Wardwright'],
    [qr/\bcomponents?\b/, 'Components Merchant'],
    [qr/\bsage\b/, 'Sage'],
    [qr/\barchivist\b/, 'Archivist'],
    [qr/\bauditor\b/, 'Auditor'],
    [qr/\bdrillmaster\b/, 'Drillmaster'],
    [qr/\bmediator\b/, 'Mediator'],
    [qr/\badvocate\b/, 'Advocate'],
    [qr/\bherald\b/, 'Herald'],
    [qr/\binspector\b/, 'Inspector'],
    [qr/\bregistrar\b/, 'Registrar'],
    [qr/\bwarden\b/, 'Warden'],
    [qr/\bmarshal\b/, 'Marshal'],
    [qr/\bproctor\b/, 'Proctor'],
    [qr/\bbroker\b/, 'Broker'],
    [qr/\bpostmaster\b/, 'Postmaster'],
    [qr/\bconductor\b/, 'Conductor'],
    [qr/\bchancellor\b/, 'Chancellor'],
    [qr/\bmagistrate\b/, 'Magistrate'],
    [qr/\bcommander\b/, 'Commander'],
    [qr/\bnexus\s+master\b/, 'Nexus Master'],
    [qr/\bmarket\s+warden\b/, 'Market Warden'],
    [qr/\barch-?controller\b/, 'Arch-Controller'],
    [qr/\bassessor\s+prime\b/, 'Assessor Prime'],
    [qr/\bmaestro\b/, 'Maestro'],
    [qr/\bdirector\b/, 'Director'],
    [qr/\bprofessor\b/, 'Professor'],
    [qr/\bdean\b/, 'Dean'],
    [qr/\bsister\b/, 'Sister'],
    [qr/\blady\b/, 'Lady'],
    [qr/\bmaster\b/, 'Master'],
    [qr/\bchef\b/, 'Chef'],
    [qr/\bclerk\b/, 'Clerk'],
    [qr/\bkeywright\b/, 'Keywright'],
    [qr/\bfactor\b/, 'Factor'],
  );
  for my $pair (@map) { return $pair->[1] if $d =~ $pair->[0]; }
  # No good match
  return undef;
}

# Pass 1: build name -> role from location files
find({ wanted => sub {
        return unless -f $_ && $_ =~ /\.md$/;
        my $path = $File::Find::name;
        return unless $path =~ /docs\/Io'lokar\/Locations\//;
        my $src = read_file($path);
        for my $ln (split(/\n/, $src)) {
          # Owner/Manager or Steward/Head
          if ($ln =~ /-\s*(Owner\/Manager|Steward\/Head):\s*([^\(\n]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)\s*,\s*(.+)$/i) {
            my ($label,$name,$variant,$desc) = ($1,$2,$3,$4);
            $name =~ s/^\s+|\s+$//g;
            my $role = title_from_name($name) // pick_role_from_desc($desc);
            $name_to_role{$name} ||= $role;
            next;
          }
          if ($ln =~ /^\s*-\s*([A-Z][^\(\n,]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)\s*,\s*(.+)$/) {
            my ($name,$variant,$desc) = ($1,$2,$3);
            $name =~ s/^\s+|\s+$//g;
            my $role = title_from_name($name) // pick_role_from_desc($desc);
            $name_to_role{$name} ||= $role;
            next;
          }
        }
      }, no_chdir => 1 }, $locations_dir);

# Pass 2: update People files
find({ wanted => sub {
        return unless -f $_ && $_ =~ /\.md$/;
        my $p = $File::Find::name;
        return unless $p =~ /docs\/Io'lokar\/People\//;
        my $doc = read_file($p);
        # Extract name from title field
        my ($name) = $doc =~ /^title:\s*"([^"]+)"/m;
        return unless $name;
        my $role = $name_to_role{$name};
        return unless $role;
        $doc =~ s/^role:\s*".*?"/role: "$role"/m;
        write_file($p, $doc);
        print "Role set: $name -> $role\n";
      }, no_chdir => 1 }, $people_dir);

print "Done.\n";
