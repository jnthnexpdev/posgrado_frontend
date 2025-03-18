import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../interfaces/auth.types';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { UserAccountResponse } from '../../interfaces/user-response.types';
import { AccessCodeComponent } from '../../components/access-code/access-code.component';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent{

    public showPassword = signal(false);
    public loginForm !: FormGroup;

    constructor(
        private formBuilder : FormBuilder,
        private router : Router,
        private dialog : MatDialog,
        private _authService : AuthService,
        private _alertService : AlertService
    ){
        this.loginForm = this.formBuilder.group({
            correo : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            password : ['', Validators.required]
        });
    }

    // Mostrar / ocultar password
    public togglePassword() : void{
        this.showPassword.set(!this.showPassword());
    }

    // Validar correo electronico antes de solicitar un codigo
    public validateEmail() : void{
        if( !this.loginForm.get('correo')?.value ){
            this._alertService.alertError('Ingresa una dirección de correo valida', 5000);
            return;
        }

        // Validar si la direccion de correo pertenece a una cuenta registrada en el sistema
        this._authService.validateEmailAddress(this.loginForm.get('correo')?.value)
        .pipe(
            // Si existe entonces solicitar un codigo de acceso
            switchMap(() => {
                return this._authService.requestAccessCode(this.loginForm.get('correo')?.value);
            })
        )
        .subscribe({
            error : (err) => {
                this._alertService.alertError(err.error.message, 5000);
                return;
            }
        });

        this.openDialogAccess();
    }

    // Abrir dialogo para solicitar codigo
    public openDialogAccess() : void{
        this.dialog.open(AccessCodeComponent, {
            minWidth: '200px',
            width : '350px',
            maxWidth: '350px',
            data : { email : this.loginForm.get('correo')?.value }
        });
    }

    // Enviar peticion de login a nodejs
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
                }, 2501);
            },
            error : (err) => {
                this._alertService.alertError(`${err.error.message}`, 5000);
            },
        });

    }

    // Redireccionar al usuario dependiendo su tipo de cuenta
    private redirectHomePage() : void{
        this._authService.getUserAccount().subscribe({
            next : (response : UserAccountResponse) => {
                switch(response.accountType){
                    case 'Coordinador' : 
                        this.router.navigate(['/coordinacion/tesis']).then(() => { window.location.reload(); });
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