import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private api = "http://localhost:8000/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  addUser(user: FormData, motDePasse_confirmation) {
    return this.http.post(this.api + "signup", user);
  }
  /*
  addUser(user: FormData,motDePasse_confirmation){
    return this.http.post(this.api+"signup", {user,motDePasse_confirmation});
  }*/
  loginUser(user) {
    return this.http.post<any>(this.api + "login", user);
  }
}
