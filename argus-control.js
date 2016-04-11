var piid=6;
var serialport = require("serialport");
var GPIO = require('onoff').Gpio,
pin4 = new GPIO(4, 'out'),
pin17 = new GPIO(17, 'out'),
  but18 = new GPIO(18, 'in', 'both'),
  but22 = new GPIO(22, 'in', 'both'),
  but23 = new GPIO(23, 'in', 'both'),
  but27 = new GPIO(27, 'in', 'both');
var SerialPort = serialport.SerialPort;
var cmd=require('node-cmd');
var prompt = require('prompt');
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]

var vidcount=0;
var recV = {
  cmd: "ca 1"}
  var stopV = {
    cmd: "ca 1"}
    var http = require('http');
    http.post = require('http-post');


prompt.start();
port.open(function(error) {

  if (error) {
    console.log('failed to open: ' + error);
  } else {


but18.watch(function (err, value) {
  if (err) {
    throw err;
  }
  if (value==1){

  port.write("6 serial rec\n", function(err, results) {
    console.log("SERIAL REC - 17 on");
pin17.writeSync(1);
  });

// setTimeout(function(){ 
// port.write("6 serial rec\n", function(err, results) {
//     console.log("SERIAL REC");
//   });
// }, 100);
  


    }

});


but22.watch(function (err, value) {
  if (err) {
    throw err;
  }
  if (value==1){
port.write("6 web rec\n", function(err, results) {
    cmd.run('/home/pi/RPi_Cam_Web_Interface/./start.sh');//cmd.run('./stop.sh');
console.log("starting camera servie start");
setTimeout(function(){ 
  http.post('http://localhost/html/cmd_pipe.php?cmd=ca 1', {}, function(res){
  console.log("web record start"); 
});
}, 15000);
  });
}
});

but23.watch(function (err, value) {
  if (err) {
    throw err;
  }
  if (value==1){

 http.post('http://localhost/html/cmd_pipe.php?cmd=ca 0', {}, function(res){
  console.log("web record stop"); 
});
 setTimeout(function(){ 
  cmd.run('pkill raspivid');
console.log("serial record stop"); 
}, 5000);



port.write("6 pin17 off\n", function(err, results) {
    console.log("17 off");
    // pin4.writeSync(0);
    pin17.writeSync(0);
  });
setTimeout(function(){ 
  port.write("6 pin4 off\n", function(err, results) {
    console.log("4 off");
    // pin4.writeSync(0);
    pin4.writeSync(0);
  });
}, 1000);

setTimeout(function(){ 
  port.write("6 rec stop\n", function(err, results) {
    console.log("rec stop");
  });
}, 1500);




}
});

but27.watch(function (err, value) {
  if (err) {
    throw err;
  }
  if (value==1){
  port.write("6 pin4 on\n", function(err, results) {
    //console.log('err ' + err);
    //console.log('results ' + results);
    console.log("4 on");
    pin4.writeSync(1);
    // pin17.writeSync(0);
  });
}
});




getdata();
   

    console.log('Serial open');
    port.on('data', function(data) {
    //console.log('data length: ' + data.length);
    console.log(data);


//     if (data=="18 = 1"){
// port.write("6 pin4 on\n", function(err, results) {
//     console.log('err ' + err);
//     console.log('results ' + results);
//     console.log("GPIO 4 HIGH");
//     pin4.writeSync(1);
//   });
//     }

//     if (data=="22 = 1"){
//     port.write("6 pin17 on\n", function(err, results) {
//     console.log('err ' + err);
//     console.log('results ' + results);
//     console.log("GPIO 17 HIGH");
//     pin17.writeSync(1);
//   });
//     }


//     if (data=="23 = 1"){
// port.write("6 lights off\n", function(err, results) {
//     console.log('err ' + err);
//     console.log('results ' + results);
//     console.log("Lights off");
//     pin4.writeSync(0);
//     pin17.writeSync(0);
//   });  
// ;    
//     }


   // port.write("hello");
    });


}

});



function getdata(){
  prompt.get(['Command'], function (err, result) {
      // prompt.get(['Unit', 'Command'], function (err, result) {

    // 
    // Log the results. 
    // 
    port.write(result.Command);
    port.write("\n");
    console.log('Command: '+result.Command+' .....sent');




  if (piid+" pin4 on"==result.Command){
    console.log("GPIO 4 HIGH");
    pin4.writeSync(1);
    
    
  }


  if (piid+" pin4 off"==result.Command){
    console.log("GPIO 4 LOW");
    pin4.writeSync(0);
  }

  if (piid+" pin17 on"==result.Command){
    console.log("GPIO 17 HIGH");
    pin17.writeSync(1);
  }


  if (piid+" pin17 off"==result.Command){
    console.log("GPIO 17 LOW");
    pin17.writeSync(0);
  }



  if (piid+" svid rec"==result.Command){
//cmd.run('./stop.sh');
setTimeout(function(){ 
  cmd.run('cd /home/pi/Desktop/argus/');
cmd.run('raspivid -t 999999 -o K.h264 &');
console.log("Serial record start"); 
}, 8000);
cmd.run('/home/pi/RPi_Cam_Web_Interface/./stop.sh');
}

if (piid+" svid stop"==result.Command){
  console.log("Serial record stop");
  cmd.run('pkill raspivid');
}




if (piid+" camera start"==result.Command){
  cmd.run('/home/pi/RPi_Cam_Web_Interface/./start.sh');
  console.log("Starting Camera Service");
}

if (piid+" camera stop"==result.Command){
  cmd.run('/home/pi/RPi_Cam_Web_Interface/./stop.sh');
  console.log("Stopping Camera Service");
// cmd.run('./stop.sh');
}


if (piid+" wvid rec"==result.Command){
cmd.run('/home/pi/RPi_Cam_Web_Interface/./start.sh');//cmd.run('./stop.sh');
setTimeout(function(){ 
  http.post('http://localhost/html/cmd_pipe.php?cmd=ca 1', {}, function(res){
  console.log("Starting Camera Service");
  console.log("wvid record start"); 
});
}, 5000);
}


if (piid+" wwvid rec"==result.Command){ 
  http.post('http://localhost/html/cmd_pipe.php?cmd=ca 1', {}, function(res){
  console.log("wwvid record start"); 
});

}



if (piid+" wvid stop"==result.Command){
  http.post('http://localhost/html/cmd_pipe.php?cmd=ca 0', {}, function(res){
  console.log("wvid record stop"); 
});

}


 //  port.write("A");

        // console.log('Command: '+result.Command+' .....sent to Unit: '+result.Unit);

    // console.log('  Unit: ' + result.Unit);
    // console.log('  Command: ' + result.Command);
    getdata();
  });
}
function exit() {
  pin4.unexport();
  pin17.unexport();
  process.exit();
}

process.on('SIGINT', exit);
