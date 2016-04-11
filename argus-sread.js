var piid=6;
var vidcount;
fs = require('fs');
var serialport = require("serialport");
var GPIO = require('onoff').Gpio,
pin4 = new GPIO(4, 'out'),
pin17 = new GPIO(17, 'out');
var SerialPort = serialport.SerialPort;
var cmd=require('node-cmd');
var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]



var recV = {
  cmd: "ca 1"}
  var stopV = {
    cmd: "ca 1"}
    var http = require('http');
    http.post = require('http-post');

    port.open(function(error) {

      if (error) {
        console.log('failed to open: ' + error);
      } else {
//    port.write("A");
console.log('Serial open');
port.on('data', function(data) {
  
  console.log(piid+' command received= ' + data);
if (data[0]==piid){
  if (piid+" pin4 on"==data){
    console.log("GPIO 4 HIGH");
    pin4.writeSync(1);
  }

if (piid+" vidcount"==data){
  fs.readFile('/home/pi/Desktop/argus/vidcount.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
}


  if (piid+" pin4 off"==data){
    console.log("GPIO 4 LOW");
    pin4.writeSync(0);
  }

  if (piid+" pin17 on"==data){
    console.log("GPIO 17 HIGH");
    pin17.writeSync(1);
  }


  if (piid+" pin17 off"==data){
    console.log("GPIO 17 LOW");
    pin17.writeSync(0);
  }

if (piid+" camera start"==data){
  cmd.run('/home/pi/RPi_Cam_Web_Interface/./start.sh');
  console.log("Starting Camera Service");
}

if (piid+" camera stop"==data){
  cmd.run('/home/pi/RPi_Cam_Web_Interface/./stop.sh');
  console.log("Stopping Camera Service");
// cmd.run('./stop.sh');
}

if (piid+" web rec"==data){
 cmd.run('sudo pkill raspivid');
console.log("killing raspivid"); 

setTimeout(function(){ 
cmd.run('/home/pi/RPi_Cam_Web_Interface/./start.sh');//cmd.run('./stop.sh');
console.log("starting camera servie start");
}, 1000);


setTimeout(function(){ 
  http.post('http://localhost/html/cmd_pipe.php?cmd=ca 1', {}, function(res){
  console.log("web record start"); 
});
}, 15000);
}

  if (piid+" serial rec"==data){
cmd.run('/home/pi/RPi_Cam_Web_Interface/./stop.sh');
console.log("stopping camera service");
pin17.writeSync(1); 

fs.readFile('/home/pi/Desktop/argus/vidcount.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  vidcount=data;
  if(parseInt(vidcount)>4){
    vidcount=0;
  }
  
  setTimeout(function(){ 
    if(data==""){
   vidcount=0; 
  }
  cmd.run('cd /home/pi/Desktop/argus/');
cmd.run('sudo raspivid -t 999999 -o K'+vidcount+'.h264 &');
console.log("serial record start"); 
 console.log("VICCOUNT = "+vidcount);


 fs.writeFile("/home/pi/Desktop/argus/vidcount.txt", parseInt(vidcount)+1, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});



}, 5000);
 
});

}


if (piid+" rec stop"==data){
 http.post('http://localhost/html/cmd_pipe.php?cmd=ca 0', {}, function(res){
  console.log("web record stop"); 
});
 setTimeout(function(){ 
  cmd.run('sudo pkill raspivid');
console.log("serial record stop"); 
}, 5000);
}

 } //  port.write("A");
});


}

});


function exit() {
  pin4.unexport();
  pin17.unexport();
  process.exit();
}

process.on('SIGINT', exit);

// button.watch(light);

