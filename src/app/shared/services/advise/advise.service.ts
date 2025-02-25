import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';
import { AdvisedCount, AdvisorInfo, RegisterStudentAdvised, RegisterStudentAdvisedResponse, StudentsResponse } from '../../interfaces/students-advised.types';
import { ServerResponse } from '../../interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class AdviseService {

  private http = inject(HttpClient);

  // Registrar un nuevo alumno asesorado
  registerStudentAdvised(student : RegisterStudentAdvised) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}asesoramiento/registrar-asesorado`, student, options);
  }

  // Obtener la informacion de un asesor de un alumno
  getAdvisorInfo() : Observable<AdvisorInfo>{
    const options = { withCredentials : true };
    return this.http.get<AdvisorInfo>(`${environment.api}asesoramiento/informacion-asesor`, options);
  }

  // Obtener el conteo de alumnos asesorados por asesor
  getCountStudentsAdvised() : Observable<AdvisedCount>{
    const options = { withCredentials : true };
    return this.http.get<AdvisedCount>(`${environment.api}asesoramiento/conteo-alumnos-asesorados`, options);
  }

  // Obtener alumnos asesorados
  getStudentsAdvisedByTeacher(period : string, search: string = '', page: number = 1, pageSize: number = 1) : Observable<StudentsResponse>{
    const params = new HttpParams()
    .set('search', search || '')
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());

    const options = {
      params: params,
      withCredentials: true
    };
    return this.http.get<StudentsResponse>(`${environment.api}asesoramiento/alumnos-asesorados/${period}`, options);
  }

  // Exportar alumnos asesorados en PDF
  exportAdvised(period : string = ''){
    return this.http.get(`${environment.api}asesoramiento/exportar-alumnos-asesorados/${period}`, {responseType : 'blob', withCredentials : true});
  }

}