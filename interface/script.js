window.onload = function() {
    $.get( "xbee.php", {command: "/mode/8/o"} );
    $.get( "curl.php", {command: "/mode/8/o"} );
    $.get( "bluetooth.php", {command: "/mode/8/o"} );  
}

setInterval(function() {

    $.get( "bluetooth.php", {command: "/temperature"}, function( data ) {
        json_data = jQuery.parseJSON(data);
        if (json_data.temperature){
            $("#btTempDisplay").html("Temperature: " + json_data.temperature);    
        }
        if (json_data.connected == 1){
            $("#btStatus").html("Online");
            $("#btStatus").css("color","green");    
        }
        else {
            $("#btStatus").html("Offline");
            $("#btStatus").css("color","red");     
        }
    });

    $.get( "xbee.php", {command: "/temperature"}, function( data ) {
        json_data = jQuery.parseJSON(data);
        if (json_data.temperature){
            $("#xbeeTempDisplay").html("Temperature: " + json_data.temperature);
        }
        if (json_data.connected == 1){
            $("#xbeeStatus").html("Online"); 
            $("#xbeeStatus").css("color","green");   
        }
        else {
            $("#xbeeStatus").html("Offline");
            $("#xbeeStatus").css("color","red");    
        }
        
    });

    $.get( "curl.php", {command: "/temperature"}, function( data ) {
        json_data = jQuery.parseJSON(data);
        if (json_data.temperature){
          $("#wifiTempDisplay").html("Temperature: " + json_data.temperature);    
        }
        if (json_data.connected == 1){
            $("#wifiStatus").html("Online");
            $("#wifiStatus").css("color","green");
        }
        else {
            $("#wifiStatus").html("Offline");
            $("#wifiStatus").css("color","red");     
        }
    });

}, 2000);

// Function to control LEDs
function buttonClick(clicked_id){

    if (clicked_id == "1"){
        $.get( "curl.php", {
        command: "/digital/8/1"} );  
    } 

    if (clicked_id == "2"){
        $.get( "curl.php", {
        command: "/digital/8/0"} );  
    } 

    if (clicked_id == "3"){
        $.get( "bluetooth.php", {
        command: "/digital/8/1"} );  
    } 

    if (clicked_id == "4"){
        $.get( "bluetooth.php", {
        command: "/digital/8/0"} );  
    } 

    if (clicked_id == "5"){
        $.get( "xbee.php", {
        command: "/digital/8/1"} );  
    } 

    if (clicked_id == "6"){
        $.get( "xbee.php", {
        command: "/digital/8/0"} );  
    } 

}