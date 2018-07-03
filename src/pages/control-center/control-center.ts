import { Component } from '@angular/core';
import { SimCardModel } from '../model/sim-card-model';
import { SimCadService } from '../../services/sim-card.service';
import { filter } from "rxjs/operators";
import { NavController, Platform, AlertController, NavParams } from 'ionic-angular';
import { InfoSim } from '../info-sim/info-sim';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { LoginIonic } from '../login/login-ionic';

@Component({
  selector: 'control-center',
  templateUrl: 'control-center.html'
})
export class ControlCenter {
  showCard: any;
  notifications: string = "Todos";
  itemFilter: Array<string>;
  card: Array<SimCardModel>;
  pages: Array<{ title: string, optionMenu: any }>;
  constructor(public navParams: NavParams,
    public alertCtrl: AlertController,
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private _simCardService: SimCadService,
    public navCtrl: NavController,
    private localNotific: LocalNotifications) {

    this.pages = [
      { title: 'Limite de la SIM', optionMenu: 'limSim' },
      { title: 'Actualizar', optionMenu: 'actualizacion' },
      { title: 'Cerrar sesion', optionMenu: 'log_out' }
    ];

    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(notific => this.navCtrl
        .push(InfoSim, {
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
  filtrar(alertBolean: boolean) {
    this.deleteUser();
    this.showCard = this._simCardService.getInfoCard();
    ((this.notifications === 'Todos') ? this.showCard : this.showFiltro(this.showCard)).subscribe(value => {
      if (value.consumo >= this._simCardService.getLimite() && alertBolean && this.navParams.get('notNotifiction') != false) {
        this.localNotific.schedule({
          id: value.id,
          text: 'Alerta: Exceso de Datos',
          data: value
        });
      }
      this.card.push(value);
    });
  }

  deleteUser() {
    this.card = this.card.filter(x => x == null);
  }
  showFiltro(filt) {
    return filt.pipe(
      filter((x: any) => {
        return ((x.status + 's') == this.notifications);
      }));
  }
  showInfo(cardModel: SimCardModel) {
    this.navCtrl.push(InfoSim, {
      //se le envia el valor al componente InfoSim y lo guarda en info
      info: cardModel
    });
  }
  limitconfiguration(option){
    switch(option.optionMenu){
      case 'limSim':
      const prompt = this.alertCtrl.create({
        title: 'Configurar notificaciones',
        message: "establesca en porcentaje el rango de datos a notificar.",
        inputs: [
          {
            name: 'limite SIM',
            placeholder: 'lim',
            type: 'number'
          },
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            handler: data => {
              if(data.lim < 100){
                this._simCardService.setLimite(data.lim);
                this.filtrar(true);
              }else{
                alert('Dato no valido');
              };
            }
          }
        ]
      });
      prompt.present();
      break;
      case 'actualizacion':
      this.filtrar(true);
      break;
      case 'log_out':
      this.navCtrl.setRoot(LoginIonic);
      break;
      default:
      alert('Dato incorrecto');
    }
  }
}
