<?php
function svg($file)
{


$lines = file($file);

$name = preg_replace('/\.txt$/', '', $file);

$x = 1;
$y = 1;


$color = array('green' => '#b9fa1a',
               'brown' => '#e45c10',
               'tan' => '#ffa044',
               'transparent' => '#000000',
               );

$string = '';

foreach ($lines as $line) {
    $array = str_split($line);

    foreach ($array as $element) {

        if ($element === 't') {
            $class  = 'tan';
        } else if ($element == 'b') {
            $class  = 'brown';
        } else if ($element == 'g') {
            $class  = 'green';
        } else {
            $class = 'transparent';
        }


        $string .= "<rect x='$x' y='$y' style='fill: $color[$class]' height='1' width='1' />";

        $x++;
    }
    $x = 1;
    $y++;
}

$svg = "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='160px' height='160px' viewBox='0 0 160 160'>";
// $svg .= "<style>.green { fill:#b9fa1a; } .brown { fill:#e45c10;} .tan { fill:#ffa044;} .transparent { fill:#000000} rect {stroke-line-join:miter;}</style>";
$svg .= $string;
$svg .= "</svg>";

$handle = fopen($name . '.svg', 'w+');
fwrite($handle, $svg);
fclose($handle);

}



if ($handle = opendir('/var/www/link-demo/sprite')) {

    while (false !== ($entry = readdir($handle))) {
        echo "$entry\n";
        if (preg_match('/\.txt$/', $entry)) {
        svg($entry);
        }
    }
}
