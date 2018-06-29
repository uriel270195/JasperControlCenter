import { Component } from '@angular/core';
import { LoginIonic } from '../pages/login/login-ionic';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // make LoginIonic the root (or first) page
  rootPage = LoginIonic;

  constructor() {}
}
