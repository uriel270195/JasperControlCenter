import { Component } from '@angular/core';
import { loginService } from '../../services/login.service';
import { NavController, MenuController } from 'ionic-angular';
import { ControlCenter } from '../control-center/control-center';
import { Observable } from "rxjs";
import { from } from "rxjs/observable/from";
import { DatabaseProvider } from '../../providers/database/database';


@Component({
  selector: 'page-login-ionic',
  templateUrl: 'login-ionic.html'
})
export class LoginIonic {
  user: string;
  pass: string;
  constructor(public _log: loginService,public navctrl: NavController,public menu: MenuController, private sql: DatabaseProvider) {
    this.sql.getDato('sesionIniciada').then(val => {
      from(val).subscribe((x:any)=>{
        if(x.user!='' && x.pass != ''){
          this.acceder();
        }
        this.user=x.user;
        this.pass=x.pass;
      })
    });
  }
  ngOnDestroy(){}
    ngOnInit(){}
    validar(){
      this.menu.close();
      (this.user==null || this.user=='')?
        alert('Ingresa Usuario'):
      (this.pass==null || this.pass=='')?
        alert('Ingresa Contraseña'):
      this._log.login(this.user,this.pass) ? 
        this.acceder() : 
        alert('Usuario o contraseña incorrecta');
    }
    acceder(){
      this.sql.setDato('sesionIniciada',[{
        'user': this.user,
        'pass': this.pass
      }]);
      this.navctrl.setRoot(ControlCenter)
    }
    handleError(error: any){
      console.log(`Error: ${error}`);
      return Observable.throw(error.json() || 'Server Error');
  }
}
