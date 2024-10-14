<?php

require_once('config.php');

$energyData = include('transformEnergy.php');

$dataEnergy = json_decode($energyData, true);

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    
    // Insert energy data
    $sql = "INSERT INTO `energiedaten` (`load`, `solar`, `wind_offshore`, `wind_onshore`) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        $dataEnergy['Load'],
        $dataEnergy['Solar'],
        $dataEnergy['Wind offshore'],
        $dataEnergy['Wind onshore']
    ]);

    echo 'Daten erfolgreich in die Datenbank geladen';
} catch (PDOException $e) {
    die($e->getMessage());
}

?>