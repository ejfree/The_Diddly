#!/usr/bin/env perl
use strict;
use warnings;
use Encode;

my %map = (
  'History' => 'HIST',
  'Dragon History' => 'HIST',
  'Prophecy' => 'PROF',
  'Ancient Relics and Artifacts' => 'ARAR',
  'Arcanomechanics' => 'AMCH',
  'Elemental Binding' => 'ELBD',
  'Eldritch Engineering' => 'ELEN',
  'Magical Theory' => 'MATH',
  'Magical Theory and Application' => 'MATH',
  'Planar Studies' => 'PLAN',
  'Political Intrigue and Diplomacy' => 'POLI',
  'Economic Dominance and Resource Management' => 'EDRM',
  'Mineral Extraction & Refinement' => 'MINX',
  'Arcane Artifice and Enchantment Studies' => 'AAES',
  'Econ' => 'EDRM',
);

sub fix_line {
  my ($line) = @_;
  my $orig = $line;
  my $dash = "\xE2\x80\x93"; # en dash

  return $line if $line =~ /\.\.\./; # leave placeholders

  # Already correct: - **CODE 123 – Title**
  return $line if $line =~ /^- \*\*[A-Z]{3,4} \d{3} \xE2\x80\x93 .+\*\*\s*$/;

  # Case: - CODE 123 -/-/— Title  -> normalize
  if ($line =~ /^-\s*([A-Z]{3,4})\s+(\d{3})\s+[-\xE2\x80\x94\xE2\x80\x93]\s+(.+)/) {
    my ($code,$num,$title) = ($1,$2,$3);
    $title =~ s/\s+$//;
    return "- **$code $num $dash $title**\n";
  }

  # Case: - Title — CODE 123
  if ($line =~ /^-\s*(.+)\s+\xE2\x80\x94\s+([A-Z]{3,4})\s+(\d{3})\s*$/) {
    my ($title,$code,$num) = ($1,$2,$3);
    $title =~ s/\s+$//;
    return "- **$code $num $dash $title**\n";
  }

  # Case: - Title — Subject 123 (Subject in words like History, Econ, etc.)
  if ($line =~ /^-\s*(.+)\s+\xE2\x80\x94\s+([A-Za-z][A-Za-z &'’\/-]+)\s+(\d{3})\s*$/) {
    my ($title,$subject,$num) = ($1,$2,$3);
    $title =~ s/\s+$//;
    $subject =~ s/\s+$//;
    my $code = $map{$subject} || $subject;
    # Uppercase code guess if not mapped and looks like word
    $code = uc($code) if $code !~ /[0-9]/;
    return "- **$code $num $dash $title**\n";
  }

  # Case: already bold but wrong dash
  if ($line =~ /^- \*\*([A-Z]{3,4}) (\d{3}) [-\xE2\x80\x94] (.+)\*\*\s*$/) {
    return "- **$1 $2 $dash $3**\n";
  }

  # Fallback: inside Classes Taught, bold the full entry if it looks like a course line but isn't bolded
  if ($orig =~ /^-\s*(.+\S)\s*$/) {
    my $t = $1;
    return "- **$t**\n";
  }

  return $orig; # unchanged
}

sub process_file {
  my ($path) = @_;
  local $/ = undef;
  open my $fh, '<:raw', $path or die $!;
  my $content = <$fh>;
  close $fh;

  my $changed = 0;
  my @lines = split(/\n/, $content, -1);
  my $in = 0;
  for my $i (0..$#lines) {
    my $l = $lines[$i];
    if ($l =~ /^### Classes Taught\s*$/) { $in = 1; next; }
    if ($in && $l =~ /^### /) { $in = 0; }
    if ($in && $l =~ /^- /) {
      my $new = fix_line($l . "\n");
      chomp $new;
      if ($new ne $l) { $lines[$i] = $new; $changed = 1; }
    }
  }

  if ($changed) {
    open my $out, '>:raw', $path or die $!;
    print $out join("\n", @lines);
    close $out;
    print "Fixed: $path\n";
  }
}

my @files = @ARGV;
if (!@files) {
  # default: all faculty files
  opendir(my $dh, 'docs/University/Faculty') or die $!;
  while (my $e = readdir($dh)) {
    next unless $e =~ /\.md$/;
    process_file("docs/University/Faculty/$e");
  }
  closedir($dh);
} else {
  process_file($_) for @files;
}
