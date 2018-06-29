import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimCardModel } from '../model/sim-card-model';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { SimCadService } from '../../services/sim-card.service';
import { ControlCenter } from '../control-center/control-center';

@Component({
  selector: 'page-info-sim',
  templateUrl: 'info-sim.html'
})
export class InfoSim implements OnInit, OnDestroy{
  indexAlert:number=0;
  myIcon: string;
  statusbtn: string='Activar'
  status: string='Activo';
  mensajeAlert : string = `Desea ${this.statusbtn} Esta Tarjeta Sim?`;
  infoCard: SimCardModel;
  constructor(private alertCtrl:AlertController,private navctrl: NavController,public navParams: NavParams,private _simCardService: SimCadService) {
    this.infoCard = navParams.get('info');
  }
  ngOnInit(){
    this.myIcon = (this.infoCard.status==='Activo')?this.activos():'md-remove-circle';
  }
  ngOnDestroy(){}
  activos(){
    //Desactiva boton si su consumo es menos del 90%
    if(this.infoCard.consumo<90)
      document.getElementById('hide').hidden=true;
    this.statusbtn='Desactivar'
    this.mensajeAlert=`Desea ${this.statusbtn} Esta Tarjeta Sim?`;
    this.status='Inactivo';
    return 'md-add-circle';
  }
  activaOrDesactivaSim(){
      const prompt = this.alertCtrl.create({
        title: this.statusbtn,
        message: this.mensajeAlert,
        buttons: [
          {
            text: 'Si',
            handler: data => {
              this._simCardService.modificStatus((this.infoCard.id)-1,this.status);
              this.direccionarToControlCenter();
            }
          },
          {
            text: 'No',
            handler: data => {
              this.indexAlert=0
              this.mensajeAlert=`Desea ${this.statusbtn} esta Tarjeta Sim?`;
            }
          }
        ]
      });
    prompt.present();
  }
  direccionarToControlCenter(){
    this.mensajeAlert='Estas Seguro?';
    this.indexAlert++;
    (this.indexAlert==1)?
    this.activaOrDesactivaSim():
      this.navctrl.setRoot(ControlCenter,{
      //se le envia el valor al componente ControlCenter y lo guarda en notNotifiction
      notNotifiction: false});
    }
}
