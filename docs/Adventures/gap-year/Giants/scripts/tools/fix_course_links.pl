#!/usr/bin/env perl
use strict;
use warnings;

my $catalog = 'docs/University/Academics/course-catalog.md';
my $target  = shift @ARGV or die "Usage: $0 <markdown-file>\n";

# Build mapping: course title (inside **) -> instructor italic with link (prefixed by space + dash + space handled in replace)
open my $cfh, '<', $catalog or die "Cannot open $catalog: $!\n";
my %map;
while (my $l = <$cfh>) {
  if ($l =~ /^- \*\*(.+)\*\* — (_\[[^\]]+\]\([^\)]+\)_)/) {
    my ($key,$prof) = ($1,$2);
    $map{$key} = " — $prof";
  }
}
close $cfh;

local $/;
open my $tfh, '<', $target or die "Cannot open $target: $!\n";
my $doc = <$tfh>;
close $tfh;

my $changed = 0;
$doc =~ s{(^- \*\*(.+?)\*\*) — _.*$}{
  my ($lead,$key) = ($1,$2);
  if (exists $map{$key}) { $changed=1; "$lead$map{$key}" } else { "$lead — _" }
}gme;

open my $out, '>', $target or die "Cannot write $target: $!\n";
print $out $doc;
close $out;

print ($changed ? "Updated links in $target\n" : "No changes for $target\n");

