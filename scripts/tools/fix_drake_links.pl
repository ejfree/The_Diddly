#!/usr/bin/env perl
use strict;
use warnings;

my $catalog = 'docs/University/Academics/course-catalog.md';
my $drake   = 'docs/University/Academics/drake-year-classes.md';

open my $cfh, '<', $catalog or die $!;
my %map; # key = course title block inside ** **, value = professor italic with link (including leading space and dash)
while (my $l = <$cfh>) {
  if ($l =~ /^- \*\*(.+)\*\* — (_\[Professor .+?_)/) {
    my ($key,$prof) = ($1,$2);
    $map{$key} = " — $prof";
  }
}
close $cfh;

local $/;
open my $dfh, '<', $drake or die $!;
my $doc = <$dfh>;
close $dfh;

my $changed = 0;
$doc =~ s{^- \*\*(.+?)\*\* — _.*$}{
  my $key = $1;
  if (exists $map{$key}) { $changed=1; "- **$key**$map{$key}" } else { "- **$key** — _" }
}gme;

open my $out, '>', $drake or die $!;
print $out $doc;
close $out;

print ($changed ? "Repaired professor links in drake-year-classes.md\n" : "No changes made to drake-year-classes.md\n");

