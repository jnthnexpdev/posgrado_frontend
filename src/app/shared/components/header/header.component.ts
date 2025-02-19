import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { UserAccountResponse } from '../../../auth/interfaces/user-response.types';
import { CookiesService } from '../../../auth/services/cookies/cookies.service';
import { ServerResponse } from '../../interfaces/server.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  public menuOpen = signal(false);
  public isAuth = signal(false);
  public isTeacher = signal(false);
  public isStudent = signal(false);
  public isAdmin = signal(false);

  constructor(
    private router : Router,
    private _authService : AuthService,
    private _cookiesService : CookiesService
  ){}

  ngOnInit(): void {
    this.getUserType();
  }

  // Cambiar estado del menu en dispositivos moviles
  changeStatusMenu(): void{
    this.menuOpen.set(!this.menuOpen());
  }

  // Cerrar menu en dispositivos moviles
  closeMenu() : void{
    this.menuOpen.set(false);
  }

  // Cerrar sesion y ocultar menu
  closeSession() : void{
    this._authService.logOutUser().subscribe();

    this.isAuth.set(false);
    
    setTimeout(() => {
      this.router.navigate(['/acceso/iniciar-sesion']).then(() => {
        window.location.reload();
      });
    }, 100);
    
    this.closeMenu();
  }

  // Obtener tipo de usuario y asignar valores a los signals
  getUserType() : void{
    this._authService.getUserAccount().subscribe({
      next : (response : UserAccountResponse) => {
        switch(response.accountType){
          case 'Coordinador' : 
            this.isAdmin.set(true);  
            this.isAuth.set(true);
            break;
          case 'Asesor' : 
            this.isTeacher.set(true);
            this.isAuth.set(true);
            break;
          case 'Alumno' : 
            this.isStudent.set(true);
            this.isAuth.set(true);
            break;
          default : this.isAuth.set(false);
        }
        console.log('Admin: ', this.isAdmin());
        console.log('Asesor: ', this.isTeacher());
        console.log('Alumno: ', this.isStudent());
        console.log('Auth: ', this.isAuth());
      },
      error : (err) => {
        this.isAuth.set(false);
        this._cookiesService.removeCookie('session');
        setTimeout(() => {
          this.router.navigate(['/acceso/iniciar-sesion']);
        }, 100);
      }
    });
  }

}