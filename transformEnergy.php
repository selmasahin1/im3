<?php

$energy = include('extractEnergy.php');

// Extract the last entry from the "Load" production type
$productionTypes = ['Load', 'Solar', 'Wind offshore', 'Wind onshore'];
$energyLoads = [];

foreach ($productionTypes as $type) {
    $index = array_search($type, array_column($energy['production_types'], 'name'));
    
    if ($index !== false) {
        $typeData = $energy['production_types'][$index]['data'];
        $energyLoads[$type] = end($typeData);
    } else {
        $energyLoads[$type] = null;
    }
}
return json_encode($energyLoads);

?>