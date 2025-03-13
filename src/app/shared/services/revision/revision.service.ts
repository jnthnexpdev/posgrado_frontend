import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../interfaces/server.interface';
import { environment } from '../../../../environments/environment.development';
import { AllRevisionsOfAssignment, GetRevisionResponse, RegisterRevision } from '../../interfaces/revisions.interface';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

    private http = inject(HttpClient);

    // Registrar nueva entrega
    registerRevision(revision : RegisterRevision) : Observable<ServerResponse>{
        const options = { withCredentials : true };
        return this.http.post<ServerResponse>(`${environment.api}revisiones/registrar-entrega-alumno`, revision, options);
    }

    // Obtener todas las entregas enviadas a una asignacion
    getAllRevisionsOfAssignment(idAssignment : string) : Observable<AllRevisionsOfAssignment>{
        const options = { withCredentials : true };
        return this.http.get<AllRevisionsOfAssignment>(`${environment.api}revisiones/obtener-entregas-asignacion/${idAssignment}`, options);
    }

    // Obtener la entrega enviada de un alumno a una asignacion
    getRevisionOfAssignmentByStudent(idAssignment : string) : Observable<GetRevisionResponse>{
        const options = { withCredentials : true };
        return this.http.get<GetRevisionResponse>(`${environment.api}revisiones/informacion-entrega-alumno/${idAssignment}`, options);
    }

    // Asignar / actualizar calificacion de la entrega de un alumno
    updateRatingOfRevision(idAssignment : string, rating : number ): Observable<ServerResponse>{
        const options = { withCredentials : true };
        return this.http.patch<ServerResponse>(`${environment.api}revisiones/calificar-entrega/${idAssignment}`, rating, options);
    }

    // Exportar alumnos en PDF
    exportRevisions(idAssignment : string){
      return this.http.get(`${environment.api}revisiones/exportar-entregas-asignacion/${idAssignment}`, {responseType : 'blob', withCredentials : true});
    }

}