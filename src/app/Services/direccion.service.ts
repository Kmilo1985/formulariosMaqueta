import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DireccionModel } from '../model/direccionModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  protected urlApi = 'http://localhost:3000/contacto/';
  constructor(
    private http: HttpClient,
  ) { }

  // LISTAR DIRECCION DEL USUARIO
  listarDireccionesUser(): Observable<DireccionModel[]> {
    return this.http.get<DireccionModel[]>(this.urlApi);
  }
  // GURADAR DIRECCION DE USUARIO
  guardarDireccionUser(direccion: DireccionModel): Observable<DireccionModel> {
    return this.http.post<DireccionModel>(this.urlApi, direccion);
  }

   // GURADAR DIRECCION DE USUARIO
   eliminarDireccionUser(direccion: DireccionModel): Observable<DireccionModel> {
    return this.http.delete<DireccionModel>(this.urlApi + direccion.id);
  }
}
