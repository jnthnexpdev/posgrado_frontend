import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterTeacher, TeacherRegisterResponse, TeachersRegisterResponse } from '../../interfaces/teachers.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private http = inject(HttpClient);

  registerNewStudent( student : RegisterTeacher) : Observable<TeacherRegisterResponse>{
    const options = { withCredentials : true };
    return this.http.post<TeacherRegisterResponse>(`${environment.api}asesores/registrar-cuenta`, student, options);
  }

  getTeachersInfo() : Observable<TeachersRegisterResponse>{
    const options = { withCredentials : true };
    return this.http.get<TeachersRegisterResponse>(`${environment.api}asesores/listado-asesores`, options);
  }

}