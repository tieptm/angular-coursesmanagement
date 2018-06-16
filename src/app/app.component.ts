import { Component } from '@angular/core';
import { AuthGuard } from './services/guards/auth.guard';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public router : Router){}

  logOut() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    }
  }
}
