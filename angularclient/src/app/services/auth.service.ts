import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAINURL } from '../config/Default';
import { Login } from '../models/Login';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  //POST request 
  login(logincreds: Login){
    var res= this.http.post<any>(DOMAINURL, logincreds, httpOptions);
    console.log(res)
  }
  
}
