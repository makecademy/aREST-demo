// Function to motor direction
$(document).ready(function() {

  // Timeout
  $.ajaxSetup({
    timeout: 1500 //Time in milliseconds
  });

  // Buttons
  $("#1").click(function() {
    $.getq('queue', '/wifi/digital/8/1');
  });

  $("#2").click(function() {
    $.getq('queue', '/wifi/digital/8/0');
  });

  // Refresh interface
  function refreshInterface(device, variable, element) {
	  $.getq('queue', '/' + device + '/' + variable, function(json_data) {

	  	// Temperature
	  	if (json_data.temperature){
	      $(element).text('Temperature: ' + json_data.temperature);
	  	}

	  	// Status
	  	if (json_data.connected){
	  	  $("#" + device + "Status").text('Online');
	  	  $("#" + device + "Status").css('color', 'green');
	  	}
	  	else {
	       $("#" + device + "Status").text('Offline');
	       $("#" + device + "Status").css('color', 'red');
	  	}

	  }).fail(function(){
	  	$("#" + device + "Status").text('Offline');
	    $("#" + device + "Status").css('color', 'red');
	  });
  }

  // Refresh whole interface
  refreshInterface('wifi', 'temperature', '#wifiTemperature');
  setInterval(function() {refreshInterface('wifi', 'temperature', '#wifiTemperature')}, 2000);

  refreshInterface('bluetooth', 'temperature', '#bluetoothTemperature');
  setInterval(function() {refreshInterface('bluetooth', 'temperature', '#bluetoothTemperature')}, 2000);

  refreshInterface('xbee', 'temperature', '#xbeeTemperature');
  setInterval(function() {refreshInterface('xbee', 'temperature', '#xbeeTemperature')}, 2000);
 
});