import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Stats } from '../../interfaces/stats.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private http = inject(HttpClient);

  // Obtener estadisticas del servidor
  getStats() : Observable<Stats>{
    const options = { withCredentials : true };
    return this.http.get<Stats>(`${environment.api}estadisticas/estadisticas-generales`, options);
  }
}
