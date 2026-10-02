#!/usr/bin/env perl
use strict; use warnings;
use Encode qw(decode encode);

# Usage: theme_staff.pl <file> <owner_line> <staff_block>
# - <owner_line>: text for the single Owner/Manager bullet (without trailing newline)
# - <staff_block>: multiple lines for Key staff bullets (each starting with two spaces and a dash)

die "Usage: $0 <file> <owner_line> <staff_block>\n" unless @ARGV == 3;
my ($file, $owner_line, $staff_block) = @ARGV;

open my $fh, '<:raw', $file or die "Cannot open $file: $!\n";
my $src = do { local $/; <$fh> };
close $fh;

# Work on UTF-8 content safely
$src = decode('UTF-8', $src);

if ($src !~ /### Staff and NPCs/m) {
  # Nothing to do
  print STDERR "No Staff section in $file\n";
  exit 0;
}

# Replace Owner/Manager line in the Staff section only
$src =~ s/(### Staff and NPCs[\s\S]*?- Owner\/Manager:) [^\n]*\n/$1 $owner_line\n/;

# Replace Key staff block up to the next '- Ties to' bullet
$src =~ s/(- Key staff:\n)[\s\S]*?(- Ties to[^\n]*\n)/$1$staff_block\n$2/;

open my $out, '>:raw', $file or die "Cannot write $file: $!\n";
print $out encode('UTF-8', $src);
close $out;

exit 0;

