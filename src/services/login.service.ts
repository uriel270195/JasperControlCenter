import { Injectable } from "@angular/core";
@Injectable()
export class loginService{
    constructor(){}
    login(name: string, pass: string){
        return (name==='uriel27' && pass==='123');
    }
}