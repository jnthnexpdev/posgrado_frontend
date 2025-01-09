import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterStudent, RegisterStudentsResponse, StudentsResponse } from '../../interfaces/students-response.types';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  registerNewStudent( student : RegisterStudent) : Observable<RegisterStudentsResponse>{
    const options = { withCredentials : true };
    return this.http.post<RegisterStudentsResponse>(`${environment.api}alumnos/registrar-cuenta`, student, options);
  }

  getStudentsInfo() : Observable<StudentsResponse>{
    const options = { withCredentials : true };
    return this.http.get<StudentsResponse>(`${environment.api}alumnos/listado-alumnos`, options);
  }

}