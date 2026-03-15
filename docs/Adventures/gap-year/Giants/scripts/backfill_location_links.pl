#!/usr/bin/env perl
use strict; use warnings; use utf8; binmode STDOUT, ':utf8';
use File::Find; use Encode qw(decode encode);

my $locations_dir = "docs/Io'lokar/Locations";
my $people_dir    = "docs/Io'lokar/People";

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

my %name_to_locs; # name => array of {title, path}

sub add_link {
  my ($name,$title,$path) = @_;
  $name =~ s/^\s+|\s+$//g; return unless $name;
  push @{ $name_to_locs{$name} }, { title => $title, path => $path };
}

# Pass 1: scan locations for names
find({ wanted => sub {
        return unless -f $_ && $_ =~ /\.md$/;
        my $path = $File::Find::name;
        return unless $path =~ /docs\/Io'lokar\/Locations\//;
        my $src = read_file($path);
        my ($title) = $src =~ /^title:\s*"([^"]+)"/m;
        $title ||= $_;
        for my $ln (split(/\n/, $src)) {
          # Owner/Manager or Steward/Head single named
          if ($ln =~ /-\s*(Owner\/Manager|Steward\/Head):\s*([^\(\n]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)/i) {
            my $name = $2; add_link($name,$title,$path);
            next;
          }
          # Key contacts bullet with name
          if ($ln =~ /^\s*-\s*([A-Z][^\(\n,]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)\s*,/i) {
            my $name = $1; add_link($name,$title,$path);
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
        my ($name) = $doc =~ /^title:\s*"([^"]+)"/m;
        return unless $name;
        my $refs = $name_to_locs{$name};
        return unless $refs && @$refs;
        my @links = map { sprintf('[%s](%s)', $_->{title}, $_->{path}) } @$refs;
        my $link_text = join(', ', @links);

        # Replace within Role and Duties section only
        if ($doc =~ /(###\s+Role and Duties[\s\S]*?- Day job\/mandate:)\s*.*?\n([\s\S]*?)(?=\n###\s|\z)/m) {
          my $before = $1; my $rest = $2;
          my $replacement = "$before Based at $link_text.\n$rest";
          $doc =~ s/(###\s+Role and Duties[\s\S]*?- Day job\/mandate:)\s*.*?\n([\s\S]*?)(?=\n###\s|\z)/$replacement/m;
        } else {
          # If section exists but no bullet found, insert
          if ($doc =~ /(###\s+Role and Duties\n)/m) {
            $doc =~ s/(###\s+Role and Duties\n)/$1\n- Day job\/mandate: Based at $link_text.\n/;
          }
        }
        write_file($p, $doc);
        print "Linked: $name -> $link_text\n";
      }, no_chdir => 1 }, $people_dir);

print "Done.\n";

