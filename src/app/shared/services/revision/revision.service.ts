import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../interfaces/server.interface';
import { environment } from '../../../../environments/environment.development';
import { RegisterRevision } from '../../interfaces/revisions.interface';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  private http = inject(HttpClient);

  registerRevision(revision : RegisterRevision) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}`, revision, options);
  }

}