import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  uid: any;
  conserje = {
    state: null
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afProvider: AngularFireProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let load = this.loadingCtrl.create({
      content: 'Iniciando Sesión'
    });
    load.present();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(user=>{
      if(user){
        this.uid = this.afAuth.auth.currentUser.uid;
        this.conserje.state = '1'
        if(this.uid!=null){
          this.afProvider.actualiceUser(this.uid, this.conserje);
          this.navCtrl.setRoot(HomePage).then(()=>{
            load.dismiss();
          })
        }
      }
    }).catch(e=>{
      load.dismiss();
      console.log(e);
      alert(e);
    })
  }

}
