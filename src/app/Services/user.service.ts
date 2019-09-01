import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected urlApi = 'http://localhost:3000/user';
  constructor(private http: HttpClient) { }

  public crearServUsuario(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.urlApi, user);
  }
  public listarUsuario(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.urlApi);
  }

}
