import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { StudentsResponse } from '../../interfaces/students-response.types';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  getStudentsInfo() : Observable<StudentsResponse>{
    const options = { withCredentials : true };
    return this.http.get<StudentsResponse>(`${environment.api}alumnos/listado-alumnos`, options);
  }

}