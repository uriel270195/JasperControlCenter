import { Component } from '@angular/core';
import { loginService } from '../../services/login.service';
import { NavController, MenuController } from 'ionic-angular';
import { ControlCenter } from '../control-center/control-center';

@Component({
  selector: 'page-login-ionic',
  templateUrl: 'login-ionic.html'
})
export class LoginIonic {
  user: string;
  pass: string;
  constructor(public _log: loginService,public navctrl: NavController,public menu: MenuController) {
  }
  ngOnDestroy(){}
    ngOnInit(){}
    Acceder(){
      this.menu.close();
      (this.user==null || this.user=='')?
        alert('Ingresa Usuario'):
      (this.pass==null || this.pass=='')?
        alert('Ingresa Contraseña'):
      this._log.login(this.user,this.pass) ? 
        this.navctrl.setRoot(ControlCenter) : 
        alert('Usuario o contraseña incorrecta');
    }
}
