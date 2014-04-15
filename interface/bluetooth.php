<?php

// Get commands
$command = $_GET['command'];

// Includes
include "php_serial.class.php";

// Get configuration data
$serial_port = "/dev/tty.AdafruitEZ-Link06d5-SPP";

try {

	$serial = new phpSerial;
	$serial->deviceSet($serial_port);
	$serial->confBaudRate(115200);
	$serial->confParity("none");
	$serial->confCharacterLength(8);
	$serial->confStopBits(1);

	$h = popen('nohup sleep 5 < '. $serial_port . ' &', 'r');
	pclose($h);
	exec('stty -F '. $serial_port .' -hupcl');
	usleep(100000);

	$serial->deviceOpen();

	// Send command
	$serial->sendMessage($command . "\r");
	$answer = $serial->readPort();
	$serial->deviceClose();

	// Return JSON
	if ($answer != ""){
		echo $answer;  
	}
	else {
		echo "{\"connected\": false}";
	}

}
catch (Exception $e) {
	echo "{\"connected\": false}";
}

?>