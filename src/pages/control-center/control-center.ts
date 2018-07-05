import { Component } from '@angular/core';
import { SimCardModel } from '../model/sim-card-model';
import { SimCadService } from '../../services/sim-card.service';
import { filter } from "rxjs/operators";
import { NavController, Platform, AlertController, NavParams } from 'ionic-angular';
import { InfoSim } from '../info-sim/info-sim';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { DatabaseProvider } from '../../providers/database/database';
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
  private user: string;
  private lim: number;
  pages: Array<{ title: string, optionMenu: any }>;
  ///////////////////////////Constructor
  constructor(public alertCtrl: AlertController,
              private navParams: NavParams,
              private plt: Platform,
              private localNotifications: LocalNotifications,
              private _simCardService: SimCadService,
              public navCtrl: NavController,
              private sql: DatabaseProvider) {
    //lista para el menu de opciones
    this.pages = [
      { title: 'Limite de la SIM', optionMenu: 'limSim' },
      { title: 'Actualizar', optionMenu: 'actualizacion' },
      { title: 'Cerrar sesion', optionMenu: 'log_out' }
    ];
    //captura nombre de usuario
    this.user = _simCardService.getUser();
    //captura limite de rango de las SIM
    this.lim = _simCardService.getLimite();
    _simCardService.setLimite(this.lim);
    //evento de la notificación al dar click en uno
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(notific => this.navCtrl
        .setRoot(InfoSim, {
          info: notific.data,
          notificlic: true
        }));
    });
    //Genera lista para el filtro de SIM
    this.itemFilter = new Array<string>();
    this.itemFilter.push('Todos');
    this.itemFilter.push('Activos');
    this.itemFilter.push('Inactivos');
    this.card = new Array<SimCardModel>();
    this.filtrar(true);
  }
  //filtra las sim por estatus
  filtrar(alertBolean: boolean) {
    this.deleteUser();
    this.showCard = this._simCardService.getInfoCard();
    ((this.notifications === 'Todos') ? this.showCard : this.showFiltro(this.showCard)).subscribe(value => {
      if (value.consumo >= this.lim && alertBolean && this.navParams.get('notNotifiction') != false) {
        this.localNotifications.schedule({
          title: 'Jasper Control Center',
          id: value.id,
          text: `Alerta: Exceso de Datos en SIM ${value.name}`,
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
            name: 'lim',
            placeholder: 'limite SIM',
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
                this.sql.setLimite(this.user,data.lim);
                this.lim = data.lim;
                this._simCardService.setLimite(this.lim);
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
      this.sql.deleteSesion(this.user,this.lim);
      this.navCtrl.setRoot(LoginIonic,{
        user: this.user
      });
      break;
      default:
      alert('Dato incorrecto');
    }
  }
}
