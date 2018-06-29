import { Component } from '@angular/core';
import { SimCardModel } from '../model/sim-card-model';
import { SimCadService } from '../../services/sim-card.service';
import { filter } from "rxjs/operators";
import { NavController, Platform, AlertController, NavParams } from 'ionic-angular';
import { InfoSim } from '../info-sim/info-sim';
import { LocalNotifications } from "@ionic-native/local-notifications";

@Component({
  selector: 'control-center',
  templateUrl: 'control-center.html'
})
export class ControlCenter {
  showCard: any;
  notifications: string = "Todos";
  itemFilter: Array<string>;
  card: Array<SimCardModel>;
  constructor(public navParams:NavParams,alertCtrl: AlertController,private plt: Platform,private localNotifications: LocalNotifications,private _simCardService: SimCadService, public navCtrl: NavController,private localNotific: LocalNotifications) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(notific => this.navCtrl
        .push(InfoSim,{
          info: notific.data
        }));
    });
    this.itemFilter = new Array<string>();
    this.itemFilter.push('Todos');
    this.itemFilter.push('Activos');
    this.itemFilter.push('Inactivos');
    this.card = new Array<SimCardModel>();
    this.filtrar(true);
  }
  filtrar(alertBolean: boolean){
    this.deleteUser();   
    this.showCard = this._simCardService.getInfoCard();
    ((this.notifications==='Todos')?this.showCard:this.showFiltro(this.showCard)).subscribe(value =>{
      if(value.consumo>=90 && alertBolean && this.navParams.get('notNotifiction')!=false){
        this.localNotific.schedule({
          id: value.id,
          text: 'Alerta: Exceso de Datos',
          data: value
        });
      }
      this.card.push(value);
    });
  }
  deleteUser(){
    this.card=this.card.filter(x=>x==null);
  }
  showFiltro(filt){
    return filt.pipe(
      filter((x:any) =>{
        return ((x.status+'s')==this.notifications);
    }));
  }
  showInfo(cardModel:SimCardModel){
    this.navCtrl.push(InfoSim,{
      //se le envia el valor al componente InfoSim y lo guarda en info
      info: cardModel
    });
  }
}
