import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TesisRegister, TesisResponseServer } from '../../interfaces/tesis.interface';
import { Observable } from 'rxjs';
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

}