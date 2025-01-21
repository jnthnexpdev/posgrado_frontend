import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterStudent, RegisterStudentsResponse, StudentsResponse } from '../../interfaces/students.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  registerNewStudent( student : RegisterStudent) : Observable<RegisterStudentsResponse>{
    const options = { withCredentials : true };
    return this.http.post<RegisterStudentsResponse>(`${environment.api}alumnos/registrar-cuenta`, student, options);
  }

  getStudentsInfo(search: string = '', page: number = 1, pageSize: number = 20) : Observable<StudentsResponse>{
    const params = new HttpParams()
    .set('search', search || '')
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    const options = {
      params: params,
      withCredentials: true
    };
    return this.http.get<StudentsResponse>(`${environment.api}alumnos/listado-alumnos`, options);
  }

}