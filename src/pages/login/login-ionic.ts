import { Component } from '@angular/core';
import { loginService } from '../../services/login.service';
import { NavController, MenuController } from 'ionic-angular';
import { ControlCenter } from '../control-center/control-center';
import { Observable } from "rxjs";
import { from } from "rxjs/observable/from";
import { DatabaseProvider } from '../../providers/database/database';
import { SimCadService } from '../../services/sim-card.service';


@Component({
  selector: 'page-login-ionic',
  templateUrl: 'login-ionic.html'
})
export class LoginIonic {
  private user: string;
  private pass: string;
  private lim:number;
  private cargaDBolean: boolean= false;
  constructor(private _simCardService: SimCadService,
              private _log: loginService,
              private navctrl: NavController,
              private menu: MenuController, 
              private sql: DatabaseProvider) {
    //Carga datos en la base y los muestra en pantalla
    this.sql.getDato('sesionActual').then(val => {
      from(val).subscribe((x:any)=>{
        this.user=x.user;
        this.pass=x.pass;
        if(x.user!='' && x.pass != ''){
          this.cargaBD();
        }
      })
    });
  }
  //Valida que los campos este llenos
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
    //devuelve un boleano para realizar la Carga los datos en la BD
    cargaBD(){
      this.sql.getDato(this.user).then(val => {
        from(val).subscribe((x:any)=>{
          this.cargaDBolean = true;
          this.lim=x.limSim;
          this.acceder();
        })
      });
    }
    //metodo para igresar al access control
    acceder(){
      //Carga los datos por primera vez
      if(this.cargaDBolean==false){
        this.sql.setDato(this.user,[{
          'user': this.user,
          'limSim': 90
        }]);
        this.lim=90;
      }
      ///agrega los datos de la sesion actual
      this.sql.setDato('sesionActual',[{
        'user': this.user,
        'pass': this.pass,
        'limSim': this.lim
      }]);

      this._simCardService.setLimite(this.lim)
      this._simCardService.setUser(this.user);
      this.navctrl.setRoot(ControlCenter)
    }
    handleError(error: any){
      console.log(`Error: ${error}`);
      return Observable.throw(error.json() || 'Server Error');
  }
}
