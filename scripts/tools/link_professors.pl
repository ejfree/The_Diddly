#!/usr/bin/env perl
use strict;
use warnings;
use File::Basename;

my $file = shift @ARGV or die "Usage: $0 <markdown-file>\n";

# Build set of valid professor slugs
my %valid;
opendir(my $dh, 'docs/University/Faculty') or die $!;
while (my $e = readdir($dh)) {
  next unless $e =~ /^professor-.*\.md$/;
  $e =~ s/\.md$//;
  $valid{$e} = 1;
}
closedir($dh);

local $/; # slurp
open my $fh, '<', $file or die $!;
my $content = <$fh>;
close $fh;

my $changed = 0;

$content =~ s{_Professor ([^_\(]+?) \(([^\)]+)\)_}{
  my ($name,$type) = ($1,$2);
  my $slug_tail = lc($name);
  $slug_tail =~ s/[^a-z0-9]+/-/g;
  $slug_tail =~ s/^-+|-+$//g;
  my $slug = "professor-$slug_tail";
  if ($valid{$slug}) {
    $changed=1;
    "_[Professor $name ($type)](../Faculty/$slug.md)_"
  } else {
    "_Professor $name ($type)_"
  }
}eg;

if ($changed) {
  open my $out, '>', $file or die $!;
  print $out $content;
  close $out;
  print "Linked professors in: $file\n";
} else {
  print "No professor links changed in: $file\n";
}
