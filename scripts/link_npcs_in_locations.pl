#!/usr/bin/env perl
use strict; use warnings; use utf8; binmode STDOUT, ':utf8';
use File::Find; use Encode qw(decode encode);

my $locations_dir = "docs/Io'lokar/Locations";

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

sub sluggify {
  my ($s) = @_;
  $s =~ s/^\s+|\s+$//g;
  $s = lc $s;
  $s =~ s/[`'’]//g;
  $s =~ s/[^a-z0-9]+/-/g;
  $s =~ s/-{2,}/-/g;
  $s =~ s/^-|-$//g;
  return $s || 'npc';
}

find({ wanted => sub {
        return unless -f $_ && $_ =~ /\.md$/;
        my $path = $File::Find::name;
        return unless $path =~ /docs\/Io'lokar\/Locations\//;
        my $doc = read_file($path);

        # Only operate inside Staff sections
        my $changed = 0;
        $doc =~ s{(###\s+(?:Staff and NPCs|Staff and Roles)[\s\S]*?)(?=\n###\s|\z)}{
          my $block = $1;
          # Link Owner/Manager or Steward/Head names not already linked
          $block =~ s{(-\s*(?:Owner/Manager|Steward/Head):\s*)(?!\[)([^\(\n]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)}{
            my ($pre,$name,$variant) = ($1,$2,$3);
            my $slug = sluggify($name);
            sprintf('%s[%s](../People/%s.md) (%s dragon)', $pre, $name, $slug, $variant);
          }egm;
          # Link Key contact-style bullets beginning with a name
          $block =~ s{(^\s*-\s*)(?!\[)([A-Z][^\(\n,]+?)\s*\(([A-Za-z][A-Za-z ]*?)\s+dragon\)(\s*,)}{
            my ($pre,$name,$variant,$post) = ($1,$2,$3,$4);
            my $slug = sluggify($name);
            sprintf('%s[%s](../People/%s.md) (%s dragon)%s', $pre, $name, $slug, $variant, $post);
          }egm;
          $changed=1 if $block ne $1;
          $block;
        }eg;

        if ($changed) {
          write_file($path, $doc);
          print "Linked NPCs in: $path\n";
        }
      }, no_chdir => 1 }, $locations_dir);

print "Done.\n";

