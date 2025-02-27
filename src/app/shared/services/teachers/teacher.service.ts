import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterTeacher, TeachersRegisterResponse } from '../../interfaces/teachers.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ServerResponse } from '../../interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private http = inject(HttpClient);

  // Registrar nuevo asesor
  registerNewTeacher( student : RegisterTeacher) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}asesores/registrar-cuenta`, student, options);
  }

  // Obtener la informacion de los asesores
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

  // Exportar asesores en PDF
  exportTeachers(){
    return this.http.get(`${environment.api}asesores/exportar-asesores`, {responseType : 'blob', withCredentials : true});
  }

  // Eliminar asesor mediante id
  deleteTeacher(id : string) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.delete<ServerResponse>(`${environment.api}asesores/eliminar-cuenta/${id}`, options);
  }

}