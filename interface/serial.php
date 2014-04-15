<?php

// Get commands
$pin = $_GET['pin'];
$state = $_GET['state'];

// Includes
include "php_serial.class.php";
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Get configuration data
$serial_port = "/dev/cu.usbserial-A702LF8B";

$serial = new phpSerial;
$serial->deviceSet($serial_port);
$serial->confBaudRate(9600);
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);

$h = popen('nohup sleep 5 < '. $serial_port . ' &', 'r');
pclose($h);
exec('stty -F '. $serial_port .' -hupcl');
usleep(100000);

$serial->deviceOpen();

// Send command
$serial->sendMessage("/digital/". $pin ."/". $state . "\r");
$serial->deviceClose();

?>