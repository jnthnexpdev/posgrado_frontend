import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../interfaces/auth.types';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { UserAccountResponse } from '../../interfaces/user-response.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public showPassword = signal(false);
  public loginForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private _authService : AuthService,
    private _alertService : AlertService
  ){
    this.loginForm = this.formBuilder.group({
      correo : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password : ['', Validators.required]
    });
  }

  ngOnInit(): void {  
  }

  public togglePassword() : void{
    this.showPassword.set(!this.showPassword());
  }

  public sendLoginRequest(){
    const body : LoginRequest = {
      correo : this.loginForm.get('correo')?.value,
      password : this.loginForm.get('password')?.value
    };

    this._authService.loginUser(body).subscribe({
      next : (response) => {
        this._alertService.alertOk(`${response.message}`, 2500);
        setTimeout(() => {
          this.redirectHomePage();
        }), 2501;
      },
      error : (err) => {
        this._alertService.alertError(`${err.error.message}`, 5000);
      },
    });

  }

  private redirectHomePage() : void{
    this._authService.getUserAccount().subscribe({
          next : (response : UserAccountResponse) => {
            switch(response.accountType){
              case 'Coordinador' : 
                this.router.navigate(['/coordinacion/asesores']).then(() => { window.location.reload(); });
                break;
              case 'Asesor' : 
                this.router.navigate(['/asesor/alumnos-asesorados']).then(() => { window.location.reload(); });
                break;
              case 'Alumno' : 
                this.router.navigate(['/alumno/asignaciones']).then(() => { window.location.reload(); });
                break;
            }
          },
          error : (err) => {
            console.error(err.error.message);
          }
        });
  }

}