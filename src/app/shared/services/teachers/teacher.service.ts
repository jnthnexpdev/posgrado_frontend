import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterTeacher, TeacherRegisterResponse, TeachersRegisterResponse } from '../../interfaces/teachers.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ServerResponse } from '../../interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private http = inject(HttpClient);

  registerNewStudent( student : RegisterTeacher) : Observable<TeacherRegisterResponse>{
    const options = { withCredentials : true };
    return this.http.post<TeacherRegisterResponse>(`${environment.api}asesores/registrar-cuenta`, student, options);
  }

  getTeachersInfo(search: string = '', page: number = 1, pageSize: number = 1) : Observable<TeachersRegisterResponse>{
    const params = new HttpParams()
    .set('search', search || '')
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    const options = {
      params: params,
      withCredentials: true
    };

    return this.http.get<TeachersRegisterResponse>(`${environment.api}asesores/listado-asesores`, options);
  }

  deleteTeacher(id : string) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.delete<ServerResponse>(`${environment.api}asesores/eliminar-cuenta/${id}`, options);
  }

}