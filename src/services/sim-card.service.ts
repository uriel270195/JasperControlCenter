import { Injectable } from "@angular/core";
import { SimCardModel } from "../pages/model/sim-card-model";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { from } from "rxjs/observable/from";
@Injectable()
export class SimCadService{
    json = [
        {
            "status":"Activo",
            "name":"uriel",
            "ubicacion":"213",
            "id":1,
            "consumo":98
        },
        {
            "status":"Activo",
            "name":"Irvin",
            "ubicacion":"3213",
            "id":2,
            "consumo":56
        },
        {
            "status":"Inactivo",
            "name":"Victor",
            "ubicacion":"2313",
            "id":3,
            "consumo":29
        },
        {
            "status":"Activo",
            "name":"Pepe",
            "ubicacion":"321312",
            "id":4,
            "consumo":43
        },
        {
            "status":"Inactivo",
            "name":"Niko",
            "ubicacion":"321321",
            "id":5,
            "consumo":79
        },

        {
            "status":"Activo",
            "name":"Tania",
            "ubicacion":"321312",
            "id":6,
            "consumo":90
        },
        {
            "status":"Inactivo",
            "name":"Ivette",
            "ubicacion":"321312",
            "id":7,
            "consumo":14
        },
    ];
    private limiteDatos: number;
    private user: string;
    constructor(){}
    getLimite(){
        return this.limiteDatos
    }
    setLimite(limiteDatos:number){
        this.limiteDatos=limiteDatos
    }
    getUser(){
        return this.user
    }
    setUser(user:string){
        this.user=user
    }
    getInfoCard(){
        return from(this.json).pipe(
            map((x:any)=>{
                let simCardObj = new SimCardModel();
                simCardObj.status=x.status;
                simCardObj.name=x.name;
                simCardObj.ubicacion=x.ubicacion;
                simCardObj.id=x.id;
                simCardObj.consumo=x.consumo;
                return simCardObj;
            }),
            catchError(this.handleError)
        );
    }
    handleError(error: any){
        console.log(`Error: ${error}`);
        return Observable.throw(error.json() || 'Server Error');
    }
    //Modifica el estatus de una SIM
    modificStatus(id, status: string){
        this.json[id].status=status;
    }
}