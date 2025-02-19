import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterStudent, RegisterStudentsResponse, StudentsResponse } from '../../interfaces/students.interface';
import { ServerResponse } from '../../interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  // Registrar nuevo alumno
  registerNewStudent( student : RegisterStudent) : Observable<RegisterStudentsResponse>{
    const options = { withCredentials : true };
    return this.http.post<RegisterStudentsResponse>(`${environment.api}alumnos/registrar-cuenta`, student, options);
  }

  // Obtener informacion de los alumnos
  getStudentsInfo(search: string = '', page: number = 1, pageSize: number = 1) : Observable<StudentsResponse>{
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

  // Exportar alumnos en PDF
  exportStudents(){
    return this.http.get(`${environment.api}alumnos/exportar-alumnos`, {responseType : 'blob', withCredentials : true});
  }

  // Eliminar alumno mediante id
  deleteStudent(id : string) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.delete<ServerResponse>(`${environment.api}alumnos/eliminar-cuenta/${id}`, options);
  }

}