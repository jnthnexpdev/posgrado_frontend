import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServerResponse } from '../../interfaces/server.interface';
import { PublicationForm, PublicationResponseServer } from '../../interfaces/publications.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
    private http = inject(HttpClient);

        // Registrar publicacion
        registerPublication(publication : PublicationForm) : Observable<ServerResponse>{
            const options = { withCredentials : true };
            return this.http.post<ServerResponse>(`${environment.api}publicaciones/registrar-publicacion`, publication, options);
        }

        // Obtener la publicacion de un alumno
        getPublicationOfStudent() : Observable<PublicationResponseServer>{
            const options = { withCredentials : true };
            return this.http.get<PublicationResponseServer>(`${environment.api}publicaciones/buscar-publicacion-alumno`, options);
        }

        // Editar la informacion de una publicacion
        editPublication(id : string, tesis : PublicationForm) : Observable<ServerResponse>{
            const options = { withCredentials : true };
            return this.http.put<ServerResponse>(`${environment.api}publicaciones/editar-informacion/${id}`, tesis, options);
        }


}
