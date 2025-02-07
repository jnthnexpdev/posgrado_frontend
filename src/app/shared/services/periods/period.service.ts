import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AllPeriods, RegisterPeriod } from '../../interfaces/periods.interface';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../interfaces/server.interface';
import { environment } from '../../../../environments/environment.development';
import { StudentsByPeriodResponse } from '../../interfaces/students.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private http = inject(HttpClient);

  // Registrar un nuevo periodo
  registerPeriod(period : RegisterPeriod) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}periodos/registrar-periodo`, period, options);
  }

  // Agregar alumno a un periodo
  addStudentToPeriod(idStudent : string, idPeriod : string) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.patch<ServerResponse>(`${environment.api}periodos/agregar-alumno/${idStudent}/${idPeriod}`, options);
  }

  // Obtener los periodos registrados
  getPeriodsInfo(search: string = '', page: number = 1, pageSize: number = 30) : Observable<AllPeriods>{
    const params = new HttpParams()
    .set('search', search || '')
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    const options = {
      params: params,
      withCredentials: true
    };
    return this.http.get<AllPeriods>(`${environment.api}periodos/listado-periodos`, options);
  }

  // Obtener alumnos por periodo
  getStudentListByPeriod(idPeriod : string, search: string = '', page: number = 1, pageSize: number = 1) : Observable<StudentsByPeriodResponse>{
    const params = new HttpParams()
    .set('search', search || '')
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    const options = {
      params: params,
      withCredentials: true
    };
    return this.http.get<StudentsByPeriodResponse>(`${environment.api}periodos/listado-alumnos-periodo/${idPeriod}`, options);
  }

  // Exportar periodos en PDF
  exportPeriods(){
    return this.http.get(`${environment.api}periodos/exportar-periodos`, {responseType : 'blob', withCredentials : true});
  }

  // Eliminar periodo por id
  deletePeriodById(idPeriod : string) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.delete<ServerResponse>(`${environment.api}periodos/eliminar-periodo/${idPeriod}`, options);
  }

}