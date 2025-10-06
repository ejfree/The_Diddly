#!/usr/bin/env perl
use strict; use warnings; use utf8; binmode STDOUT, ':utf8';
use File::Find; use File::Spec; use Encode qw(decode encode);

my $locations_dir = "docs/Io'lokar/Locations";
my $people_dir    = "docs/Io'lokar/People";
my $template_path = "templates/npc_io_citizen_template.md";

sub sluggify {
  my ($s) = @_;
  $s = lc $s;
  $s =~ s/['`’]//g;            # drop apostrophes
  $s =~ s/[^a-z0-9]+/-/g;      # non-alnum to dash
  $s =~ s/-{2,}/-/g;           # collapse dashes
  $s =~ s/^-|-$//g;            # trim dashes
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

my $template = read_file($template_path);

my %seen;
my @targets;

find({ wanted => sub {
        return unless -f $_ && $_ =~ /\.md$/;
        my $path = $File::Find::name;
        return unless $path =~ /docs\/Io'lokar\/Locations\//;
        my $src = read_file($path);
        my $section = $src; # search whole file, but we'll bias by staff sections when possible

        my @lines = split(/\n/, $section);
        my $context = '';
        for my $ln (@lines) {
          $context = 'staff' if $ln =~ /^###\s+(Staff and NPCs|Staff and Roles)/i;
          $context = '' if $ln =~ /^###\s+/ && $ln !~ /^###\s+(Staff and NPCs|Staff and Roles)/i;
          next unless $context eq 'staff';

          # Owner/Manager or Steward/Head line with Name (Type dragon)
          if ($ln =~ /-\s*(Owner\/Manager|Steward\/Head):\s*([^\(\n]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)/i) {
            my ($label,$name,$variant) = ($1,$2,$3);
            $name =~ s/\s+$//; $variant =~ s/\s+$//;
            my $slug = sluggify($name);
            next if $seen{$name}++;
            push @targets, [$name, lc $variant, $label];
            next;
          }

          # Key contacts bullets: - Name (Type dragon), ...  (avoid unit/count patterns like ", 1)")
          if ($ln =~ /^\s*-\s*([A-Z][^\(\n,]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)\s*,/i) {
            my ($name,$variant) = ($1,$2);
            $name =~ s/\s+$//; $variant =~ s/\s+$//;
            my $slug = sluggify($name);
            next if $seen{$name}++;
            push @targets, [$name, lc $variant, 'Key contact'];
            next;
          }
        }
      }, no_chdir => 1 }, $locations_dir);

for my $t (@targets) {
  my ($name,$variant,$role) = @$t;
  my $slug = sluggify($name);
  my $out = File::Spec->catfile($people_dir, "$slug.md");
  next if -e $out; # do not overwrite existing
  my $doc = $template;
  $doc =~ s/\$\{name\}/$name/g;
  $doc =~ s/species: \"\"/species: \"dragon\"/;
  $doc =~ s/dragon_variant: \"\"/dragon_variant: \"$variant\"/;
  $doc =~ s/role: \"\"/role: \"$role\"/;
  write_file($out, $doc);
  print "Created: $out\n";
}

print scalar(@targets) . " NPCs discovered (new files created where missing).\n";

