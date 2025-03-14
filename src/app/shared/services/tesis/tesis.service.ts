import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AllTesisOfPeriod, EditTesis, TesisRegister, TesisResponseServer } from '../../interfaces/tesis.interface';
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

    // Obtener todas las tesis de un periodo
    allTesisOfPeriod( period : string ) : Observable<AllTesisOfPeriod>{
        const options = { withCredentials : true };
        return this.http.get<AllTesisOfPeriod>(`${environment.api}tesis/tesis-alumnos-periodo/${period}`, options);
    }

    // Editar la informacion de una tesis
    editTesis(id : string, tesis : EditTesis) : Observable<ServerResponse>{
        const options = { withCredentials : true };
        return this.http.put<TesisResponseServer>(`${environment.api}tesis/editar-informacion/${id}`, tesis, options);
    }

    // Aprobar tesis
    approveTesis(idTesis : string) : Observable<ServerResponse>{
        const options = { withCredentials : true };
        return this.http.patch<ServerResponse>(`${environment.api}tesis/aprobar-tesis/${idTesis}`, {}, options);
    }

    // Rechazar tesis
    rejectTesis(idTesis : string) : Observable<ServerResponse>{
        const options = { withCredentials : true };
        return this.http.patch<ServerResponse>(`${environment.api}tesis/rechazar-tesis/${idTesis}`, options);
    }

}