import { HttpClient } from '@angular/common/http';
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

  getStudentsAdvisedByTeacher() : Observable<StudentsResponse>{
    const options = { withCredentials : true };
    return this.http.get<StudentsResponse>(`${environment.api}asesoramiento/alumnos-asesorados`, options);
  }

}