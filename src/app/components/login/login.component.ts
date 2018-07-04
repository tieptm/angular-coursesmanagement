import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error : number = 0;
  public loginForm : FormGroup;
  public user: User


  constructor(
    private router : Router,
    private fb: FormBuilder
  ) { 
    this.loginForm = this.fb.group({
      username:  ['',  [Validators.required]],
      password: ['',  [Validators.required]]
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    if(localStorage.getItem('user')) {
      this.router.navigate(['']);
    }
  }

  onLogin(username, password) {
    let user = {
      username : username,
      password : password
    }
    if(this.loginForm.value.username == 'admin' && this.loginForm.value.password == 'admin') {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['courses']);
    }
    else {
      this.error = -1;
    }
  }

}
