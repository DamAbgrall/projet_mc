'use strict';

const cordova     = require('cordova-bridge');
let ModbusTcpClient  = require('modbusjs').ModbusTcpClient;


//Création du client modbustcp
var modbusTcpClient = new ModbusTcpClient('192.168.1.50', 502, {debug: true, autoReconnect: true, autoReconnectInterval: 5})
console.log(ModbusTcpClient)
//connexion au controller
modbusTcpClient.connect().then(function(){
    //Information de la connexion 
    var connectionStatus = modbusTcpClient.isConnected();
    //Lecture des register
    cordova.channel.on('message', msg => {
        log(msg);
        if(msg == "write"){
            console.log(msg == "write")
            modbusTcpClient.writeSingleRegister(12288,msg).then(function(result){
                //Log en console du resultat si succès
                log(result)
            }).catch(function(err){
                //Log de l'erreur si échec
                log(err);
            });
        }else if(msg == "read"){
            console.log(msg == "read")
            modbusTcpClient.readHoldingRegisters(12288,1).then(function(result){
                //Log en console du resultat si succès
                cordova.channel.send({"type":"read","data":result});
                log(result)
            }).catch(function(err){
                //Log de l'erreur si échec
                log(err);
            });
        }
    });


}).catch(function(err){
    //Log de l'erreur si échec de la connexion
    log(err)
});

const log = (msg) => {
    cordova.channel.send(msg);
};

process.on('uncaughtException', err => {
    log(err);
    throw err;
});

