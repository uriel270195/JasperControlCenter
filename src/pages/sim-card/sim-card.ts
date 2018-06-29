import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SimCardModel } from '../model/sim-card-model';

@Component({
  selector: 'sim-card',
  templateUrl: 'sim-card.html'
})
export class SimCard implements OnInit, OnDestroy{
  myIcon: string;
  @Input('card-data') cardData: SimCardModel;
  constructor() {}
  ngOnInit(){
    this.myIcon = (this.cardData.status==='Activo')?'md-add-circle':'md-remove-circle';
  }
  ngOnDestroy(){}
}
