import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AssignmentsResponse } from '../../interfaces/assignments.interface';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private http = inject(HttpClient);

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
}
