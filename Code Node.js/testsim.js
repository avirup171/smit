'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var moment=require('moment');

setInterval(function azcall()
{

	var connectionString= "HostName=spektro.azure-devices.net;DeviceId=wb74as3237_obd;SharedAccessKey=3yosb4qH9Uqb2yeQ4NGDRxwVyauEXwWHJxPrA+xmt94="

	var client = clientFromConnectionString(connectionString);
	function printResultFor(op) {
	  return function printResult(err, res) {
		if (err) console.log(op + ' error: ' + err.toString());
		if (res) console.log(op + ' status: ' + res.constructor.name);
	  };
	}

	var connectCallback = function (err) 
	{
	  if (err) 
	  {
		console.log('Could not connect: ' + err);
	  } 
	  else 
	  {
		console.log('Client connected');
		pubData();
		// Create a message and send it to the IoT Hub every second
		function pubData()
		{

			var Timestamp = moment(Date.now()).format();			
			var data={
						"deviceType":"car",
						"device_id":"WB74AS3237",
						"telemetry_data":
						{
							"car_speed":Math.floor(Math.random(0,300)*100),
							"engine_rpm":Math.floor(Math.random(600,8000)*1000),
							"coolant_temperature":Math.floor(Math.random(50,100)*100)
						},
						"timeStamp":Timestamp
					}
			var message = new Message(JSON.stringify(data));
			console.log("Sending message: " + message.getData());
			client.sendEvent(message, printResultFor('send'));
		}
	  }
	};
	client.open(connectCallback);

},1500);