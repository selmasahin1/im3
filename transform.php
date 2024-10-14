<?php

$location = include('extract.php');

$cityNames = [
    '52.15, 5.394' => 'Amersfoort',
];

$transformierteDaten = [];


$latLong = $location['latitude'] . ', ' . $location['longitude'];

if (isset($cityNames[$latLong])) {
    $city = $cityNames[$latLong];
} else {
    $city = 'Unbekannt';
}

$weatherCondition = determineWeatherCondition(
    $location['current']['cloud_cover'],
    $location['current']['rain'],
    $location['current']['showers'],
    $location['current']['snowfall']
);

$transformierteDaten[] = [
    'city' => $city,
    'temperature' => $location['current']['temperature_2m'],
    'rain' => $location['current']['rain'],
    'showers' => $location['current']['showers'],
    'snowfall' => $location['current']['snowfall'],
    'cloudCover' => $location['current']['cloud_cover'],
    'weatherCondition' => $weatherCondition
];


$jsonData = json_encode($transformierteDaten, JSON_PRETTY_PRINT);

return $jsonData;

function determineWeatherCondition($cloudCover, $rain, $showers, $snowfall)
{
    if ($rain > 0 || $showers > 0 || $snowfall > 0) {
        return 'regnerisch';
    } elseif ($cloudCover < 20) {
        return 'sonning';
    } elseif ($cloudCover < 70) {
        return 'teilweise bewölkt';
    } else {
        return 'bewölkt';
    }
}


?>