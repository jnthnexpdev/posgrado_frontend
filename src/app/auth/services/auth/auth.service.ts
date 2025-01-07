import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookiesService } from '../cookies/cookies.service';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest, LoginResponse } from '../../interfaces/auth.types';
import { Observable } from 'rxjs';
import { UserResponse } from '../../interfaces/user-response.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private cookies = inject(CookiesService);
  private router = inject(Router);

  // Iniciar sesion
  loginUser(body : LoginRequest): Observable<LoginResponse>{
    const options = { withCredentials : true };
    return this.http.post<LoginResponse>(`${environment.api}usuario/iniciar-sesion`, body, options);
  }
  
  getUserInfo() : Observable<UserResponse>{
    const options = { withCredentials : true };
    return this.http.get<UserResponse>(`${environment.api}usuario/informacion-usuario`, options);
  }

}