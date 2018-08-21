import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare const nodejs: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    value:any;

    constructor(public navCtrl: NavController,private platform: Platform) {

        this.init();
    }

    private init() {
        if (this.platform.is('cordova')) {
            nodejs.channel.setListener((log) => {
                console.log(log);
            });

            // Bootstrap NodeJS App
            nodejs.start('index.js', (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.info('NodeJS Engine Started');
                }
            });
        }
    }

    public write() {
        nodejs.channel.send(this.value);
    }

    public read(){
        console.log(nodejs);
        nodejs.channel.send("read");
        nodejs.channel.setListener("read",(res)=>{
            console.log(res);
        })
    }
}
