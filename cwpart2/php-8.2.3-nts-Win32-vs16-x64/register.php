<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $firstName = $data['firstName'];
    $surname = $data['surname'];
    $postcode = $data['postcode'];
    $nhsNumber = $data['nhsNumber'];

    try {
        $db = new PDO('sqlite:GPSurgery.db');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $db->prepare('INSERT INTO patientLogin (firstName, surname, postcode, nhsNumber) VALUES (:firstName, :surname, :postcode, :nhsNumber)');
        $stmt->bindParam(':firstName', $firstName);
        $stmt->bindParam(':surname', $surname);
        $stmt->bindParam(':postcode', $postcode);
        $stmt->bindParam(':nhsNumber', $nhsNumber);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>