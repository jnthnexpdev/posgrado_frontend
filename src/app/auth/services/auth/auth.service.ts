import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment.development';
import { LoginRequest, LoginResponse } from '../../interfaces/auth.types';
import { UserAccountResponse, UserResponse } from '../../interfaces/user-response.types';
import { ServerResponse } from '../../../shared/interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // Iniciar sesion
  loginUser(body : LoginRequest): Observable<LoginResponse>{
    const options = { withCredentials : true };
    return this.http.post<LoginResponse>(`${environment.api}usuario/iniciar-sesion`, body, options);
  }
  
  // Obtener la informacion de un usuario
  getUserInfo() : Observable<UserResponse>{
    const options = { withCredentials : true };
    return this.http.get<UserResponse>(`${environment.api}usuario/informacion-usuario`, options);
  }

  // Cambiar la contrasena
  changePassword(password : string) : Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.patch<ServerResponse>(`${environment.api}usuario/cambiar-password`,password, options);
  }

  // Obtener el tipo de cuenta del usuario
  getUserAccount() : Observable<UserAccountResponse>{
    const options = { withCredentials : true };
    return this.http.get<UserAccountResponse>(`${environment.api}usuario/tipo-usuario`, options);
  }

  isAuthenticated() : Observable<boolean>{
    const options = { withCredentials : true };
    return this.http.get<{ success : boolean }>(`${environment.api}usuario/tipo-usuario`, options).pipe(
      map( response => response.success ),
      catchError(() => of (false))
    );
  }

  // Cerrar sesion
  logOutUser(): Observable<ServerResponse>{
    const options = { withCredentials : true };
    return this.http.post<ServerResponse>(`${environment.api}usuario/cerrar-sesion`, {}, options);
  }

}