<?php

require_once('config.php');
$transformData = include('transform.php');

$dataWeather = json_decode($transformData, true);

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    // Insert weather data
    $sql = "INSERT INTO `wetterdaten` (`stadt`, `temperatur`, `regen`, `schauer`, `schneefall`, `bewoelkung`, `wetterzustand`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    foreach ($dataWeather as $item) {
        $stmt->execute([
            $item['city'],
            $item['temperature'],
            $item['rain'],
            $item['showers'],
            $item['snowfall'],
            $item['cloudCover'],
            $item['weatherCondition']
        ]);
    }

    echo 'Daten erfolgreich in die Datenbank geladen';
} catch (PDOException $e) {
    die($e->getMessage());
}

?>