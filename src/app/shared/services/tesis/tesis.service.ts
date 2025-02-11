import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tesis, TesisResponseServer } from '../../interfaces/tesis.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TesisService {

  private http = inject(HttpClient);

  registerTesis(tesis : Tesis) : Observable<TesisResponseServer>{
    const options = { withCredentials : true };
    return this.http.post<TesisResponseServer>(`${environment.api}tesis/registrar-tesis`, tesis, options);
  }

  getTesisByStudent() : Observable<TesisResponseServer>{
    const options = { withCredentials : true };
    return this.http.get<TesisResponseServer>(`${environment.api}tesis/buscar-tesis-alumno`, options);
  }

}