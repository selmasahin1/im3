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

  $sql = "SELECT DATE(created) AS datum, ROUND(SUM(`load`), 2) AS durchschnitt_energie FROM energiedaten WHERE created >= ? - INTERVAL 7 DAY GROUP BY DATE(created) ORDER BY datum ASC";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$date]);
  $results = $stmt->fetchAll();


  echo json_encode($results);
} catch (PDOException $e) {
  echo json_encode(['error' => $e->getMessage()]);
}

?>