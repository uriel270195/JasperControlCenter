import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {
  constructor(private storage: Storage) {}
  getDato(dato : string){
    return this.storage.get(dato);
  }
  setDato(dato : string, object){
    this.storage.set(dato,object);
  }
  //Cierra la secion guardando la configuracion de limite de la sim y eliminando password
  deleteSesion(user:string,lim:number){
    this.storage.remove(user);
        this.setDato(user,[{
          'user': user,
          'limSim': lim
        }]);
        this.setDato('sesionActual',[{
          'user': user,
          'pass': '',
          'limSim': lim
        }]);
  }
setLimite(user:string,lim:number){
  this.storage.remove(user);
  this.setDato(user,[{
    'user': user,
    'limSim': lim
  }]);
}
}
