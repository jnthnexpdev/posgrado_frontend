import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EditTesis, TesisRegister, TesisResponseServer } from '../../interfaces/tesis.interface';
import { environment } from '../../../../environments/environment.development';
import { ServerResponse } from '../../interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class TesisService {

  private http = inject(HttpClient);

  // Registrar tesis
  registerTesis(tesis : TesisRegister) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}tesis/registrar-tesis`, tesis, options);
  }

  // Obtener la tesis de un alumno
  getTesisByStudent() : Observable<TesisResponseServer>{
    const options = { withCredentials : true };
    return this.http.get<TesisResponseServer>(`${environment.api}tesis/buscar-tesis-alumno`, options);
  }

  // Editar la informacion de una tesis
  editTesis(id : string, tesis : EditTesis) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.put<TesisResponseServer>(`${environment.api}tesis/editar-informacion/${id}`, tesis, options);
  }

}