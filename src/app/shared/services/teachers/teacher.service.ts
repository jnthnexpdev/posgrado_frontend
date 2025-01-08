import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TeachersResponse } from '../../interfaces/teachers-reponse.types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private http = inject(HttpClient);

  getTeachersInfo() : Observable<TeachersResponse>{
    const options = { withCredentials : true };
    return this.http.get<TeachersResponse>(`${environment.api}asesores/listado-asesores`, options);
  }

}