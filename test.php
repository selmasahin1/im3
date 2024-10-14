<?php
echo "Hello MMP!";
echo "<br>";

$firstname = "Selma";
$lastname = "Sahin";

echo "My name is $firstname $lastname";

$age = 21;

echo "<br>";
echo "I am $age years old";
$lessondays = 6;
$imDays = 5;

$unterichtszeit = $lessondays * $imDays;

echo "<br>";
echo "I have $unterichtszeit hours of lessons per week";

$person1 = array("Selma", "Sahin", 21);
$person2 = ["Nadine", "Brändli", 22];

echo "<br>";
print_r($person1);
print_r($person2);

echo "<br>";

echo $person1[0] . " " . $person1[1] . " is " . $person1[2] . " years old";
$mensch1 = array(
    "firstname" => "Selma",
    "lastname" => "Sahin",
    "age" => 21
);
print_r($mensch1);
echo "<br>";

$mensch2 = [
    "firstname" => "Nadine",
    "lastname" => "Brändli",
    "age" => 22
];

$mensch3 = [
    "firstname" => "Lukas",
    "lastname" => "Müller",
    "age" => 16
];

$mensch4 = [
    "firstname" => "Lena",
    "lastname" => "Müller",
    "age" => 18
];


$gruppe = [$mensch1, $mensch2, $mensch3, $mensch4];

echo "<br>";

echo "<pre>";

print_r($gruppe);
echo "</pre>";

for ($i = 0; $i <= 100; $i++) {
    echo $i . " ";
}

echo "<br>";

foreach ($gruppe as $person) {
    $ausgabe = agecheck($person["age"]);
    echo $ausgabe;
    echo "<br>";
}


function agecheck($alter)
{
    if ($alter > 18) {
        return "You are old enough";
    } else {
        return "You are too young";
    }
}

echo "<pre>";
echo json_encode($gruppe);
echo "</pre>";

/* function agecheck($alter)
{
    if ($alter <= 16) {
        echo "You are too young";
    } elseif ($alter <= 18) {
        echo "You are almost old enough";
    } else {
        echo "You are old enough";
    }
} */

?>