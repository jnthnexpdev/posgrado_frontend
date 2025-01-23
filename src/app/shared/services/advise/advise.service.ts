import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RegisterStudentAdvised, RegisterStudentAdvisedResponse, StudentsResponse } from '../../interfaces/students-advised.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdviseService {

  private http = inject(HttpClient);

  registerStudentAdvised(student : RegisterStudentAdvised) : Observable<RegisterStudentAdvisedResponse>{
    const options = { withCredentials : true };
    return this.http.post<RegisterStudentAdvisedResponse>(`${environment.api}asesoramiento/registrar-asesorado`, student, options);
  }

  getStudentsAdvisedByTeacher(search: string = '', page: number = 1, pageSize: number = 1) : Observable<StudentsResponse>{
    const params = new HttpParams()
    .set('search', search || '')
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    const options = {
      params: params,
      withCredentials: true
    };
    return this.http.get<StudentsResponse>(`${environment.api}asesoramiento/alumnos-asesorados`, options);
  }

}