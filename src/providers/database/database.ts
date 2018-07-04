import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  constructor(private storage: Storage) {
    
  }
  getDato(dato : string){
    return this.storage.get(dato);
  }
  setDato(dato : string, object){
    this.storage.set(dato,object);
  }
  deleteSesion(dato: string,user:string){
    this.storage.remove(dato);
        this.setDato(dato,[{
          'user': user,
          'pass': ''
        }]);
  }
}
