<?php

include_once 'config.php';


header('Content-Type: application/json');

try {
  $pdo = new PDO($dsn, $username, $password, $options);

  $sql = "SELECT DATE(erstellt) AS datum, ROUND(AVG(schauer), 2) AS anz_regen, ROUND(AVG(temperatur), 2) AS durchschnitt_temp FROM wetterdaten WHERE erstellt >= NOW() - INTERVAL 7 DAY GROUP BY DATE(erstellt) ORDER BY datum ASC";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $results = $stmt->fetchAll();


  echo json_encode($results);
} catch (PDOException $e) {
  echo json_encode(['error' => $e->getMessage()]);
}

?>