<?php

$url = "https://api.open-meteo.com/v1/forecast?latitude=52.155170&longitude=5.387200&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,cloud_cover&temperature_unit=celsius&timezone=auto&forecast_days=1";

// Initialisiert eine cURL-Sitzung
$ch = curl_init($url);

// Setzt Optionen
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Führt die cURL-Sitzung aus und erhält den Inhalt
$response = curl_exec($ch);

// Schließt die cURL-Sitzung
curl_close($ch);

// Zeigt die JSON-Antwort an
$locations = json_decode($response, true);

return $locations;

?>