import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SimCardModel } from '../model/sim-card-model';
import { SimCadService } from '../../services/sim-card.service';

@Component({
  selector: 'sim-card',
  templateUrl: 'sim-card.html'
})
export class SimCard implements OnInit, OnDestroy{
  myIcon: string;
  colorCard:string = 'light';
  @Input('card-data') cardData: SimCardModel;
  constructor(private _serviceCard: SimCadService) {}
  ngOnInit(){
    this.myIcon = (this.cardData.status==='Activo')?'md-add-circle':'md-remove-circle';
    this.colorCard = (this.cardData.consumo>=this._serviceCard.getLimite())?'danger':'light';
  }
  ngOnDestroy(){}
}
