import { Injectable } from "@angular/core";
@Injectable()
export class loginService{
    constructor(){}
    //Evaluación de usuario
    login(name: string, pass: string){
        return ((name==='uriel27'|| name==='user' || name==='user1' || name==='user2' || name==='user3' || name==='user4' || name==='user5' || name==='user6' || name==='user7' || name==='user8' || name==='user9') && pass==='123');
    }
}