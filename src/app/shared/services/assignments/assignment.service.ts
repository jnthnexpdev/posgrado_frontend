import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AssignmentResponse, AssignmentsOfStudentResponse, AssignmentsResponse, NewAssignment } from '../../interfaces/assignments.interface';
import { environment } from '../../../../environments/environment.development';
import { ServerResponse } from '../../interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private http = inject(HttpClient);

  // Crear nueva asignacion
  createAssignment( assignment : NewAssignment) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}asignaciones/crear-asignacion`, assignment, options);
  }

  // Buscar asignacion mediante id
  searchAssignment( id : string) : Observable<AssignmentResponse>{
    const options = { withCredentials : true };
    return this.http.get<AssignmentResponse>(`${environment.api}asignaciones/buscar-asignacion/${id}`, options);
  }

  // Obtener las asignaciones creadas de un asesor por periodo
  getAssignmentsByPeriod(period : string, page: number = 1, pageSize: number = 30) : Observable<AssignmentsResponse>{
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    const options = {
      params: params,
      withCredentials: true
    };
    return this.http.get<AssignmentsResponse>(`${environment.api}asignaciones/obtener-asignaciones-asesor-periodo/${period}`, options);
  }

  // Obtener todas las asignaciones de un alumno en determinado periodo
  getAssignmentsOfStudent(period : string) : Observable<AssignmentsOfStudentResponse>{
    const options = { withCredentials : true };
    return this.http.get<AssignmentsOfStudentResponse>(`${environment.api}asignaciones/obtener-asignaciones-alumno-periodo/${period}`, options);
  }

  // Editar datos de una asignacion
  editAssignment( id : string, assignment : NewAssignment) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.patch<ServerResponse>(`${environment.api}asignaciones/editar-asignacion/${id}`, assignment, options);
  }

  // Eliminar asignacion mediante id
  deleteAssignment(id : string) : Observable <ServerResponse>{
    const options = { withCredentials : true };
    return this.http.delete<ServerResponse>(`${environment.api}asignaciones/eliminar-asignacion/${id}`, options);
  }
  
}