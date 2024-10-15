<?php

include_once 'config.php';

if (isset($_GET['date'])) {
    $date = $_GET['date'];
} else {
    $date = date('Y-m-d');
}

header('Content-Type: application/json');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    $sql = "SELECT DATE(erstellt) AS datum, ROUND(SUM(schauer), 2) AS anz_regen, ROUND(AVG(temperatur), 2) AS durchschnitt_temp FROM wetterdaten WHERE erstellt >= ? - INTERVAL 7 DAY GROUP BY DATE(erstellt) ORDER BY datum ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$date]);
    $results = $stmt->fetchAll();


    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>