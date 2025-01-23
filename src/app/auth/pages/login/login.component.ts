import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../interfaces/auth.types';
import { AlertService } from '../../../shared/services/alerts/alert.service';

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
        this._alertService.alertOk(`${response.message}`, 5000);
      },
      error : (err) => {
        this._alertService.alertError(`${err.error.message}`, 5000);
      },
    });
  }

}