import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../interfaces/server.interface';
import { environment } from '../../../../environments/environment.development';
import { GetRevisionResponse, RegisterRevision } from '../../interfaces/revisions.interface';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  private http = inject(HttpClient);

  registerRevision(revision : RegisterRevision) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}revisiones/registrar-entrega-alumno`, revision, options);
  }

  getRevisionOfAssignmentByStudent(idAssignment : string) : Observable<GetRevisionResponse>{
    const options = { withCredentials : true };
    return this.http.get<GetRevisionResponse>(`${environment.api}revisiones/informacion-entrega-alumno/${idAssignment}`, options);
  }

}