import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Login } from '../../../models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = {
    email:'',
    password:''
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}
