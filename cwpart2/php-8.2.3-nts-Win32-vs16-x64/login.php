<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Get the raw JSON input
$json = file_get_contents('php://input');
$data = json_decode($json);



try {
    $db_path = "GPSurgery.db";
    $conn = new PDO("sqlite:" . $db_path);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(array('status' => 'error', 'message' => 'Database connection error: ' . $e->getMessage()));
    exit();
}

// Get the user type from the request
$userType = $data->userType;

// Create the correct SQL query based on the user type
if ($userType === 'option1') {
    $sql = "SELECT * FROM patientLogin WHERE firstName = :firstName AND surname = :surname AND postcode = :postcode AND nhsNumber = :nhsNumber";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':firstName', $data->firstName);
    $stmt->bindParam(':surname', $data->surname);
    $stmt->bindParam(':postcode', $data->postcode);
    $stmt->bindParam(':nhsNumber', $data->nhsNumber);
} elseif ($userType === 'option2') {
    $sql = "SELECT * FROM doctorLogin WHERE UserName = :username AND Password = :password";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $data->username);
    $stmt->bindParam(':password', $data->password);
} elseif ($userType === 'option3') {
    $sql = "SELECT * FROM receptionistLogin WHERE UserName = :username AND Password = :password";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $data->username);
    $stmt->bindParam(':password', $data->password);
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid user type'));
    exit();
}

// Execute the query and check for errors
if ($stmt->execute()) {
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(array('status' => 'success', 'message' => 'Login successful'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Invalid credentials'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Database error'));
}

$conn = null;
?>