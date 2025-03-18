import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { AuthService } from '../../services/auth/auth.service';
import { NgClass } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserAccountResponse } from '../../interfaces/user-response.types';

@Component({
  selector: 'app-access-code',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule ],
  templateUrl: './access-code.component.html',
  styleUrl: './access-code.component.css'
})
export class AccessCodeComponent implements OnInit{

    public codeInvalid = signal(false);

    public btnDisable = signal(false);
    public accessForm !: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data : { email : string },
        private formBuilder : FormBuilder,
        private dialog : Dialog,
        private router : Router,
        private _alertService : AlertService,
        private _authService : AuthService
    ){
        this.accessForm = this.formBuilder.group({
            codigoAcceso : ['', [
                Validators.required, 
                Validators.minLength(6),
                Validators.maxLength(6)
            ]],
            correo : ['']
        });
    }

    ngOnInit(): void { 
    }

    // Cerrar dialogo
    public closeDialog() : void{
        this.dialog.closeAll();
    }

    // Desactivar boton para evitar multiples peticiones
    public disableBtn() : void{
        this.btnDisable.set(true);
        setTimeout(() => {
            this.btnDisable.set(false);
        }, 3000);
    }

    // Validar formulario antes de enviar a nodejs
    public validateForm() : void{
        this.disableBtn();

        if(this.accessForm.valid){
            this.sendForm();
        }else{
            Object.keys(this.accessForm.controls).forEach(key => {
                const control = this.accessForm.get(key);

                if(control?.invalid){
                    switch(key){
                        case 'codigoAcceso' : this.codeInvalid.set(true); break;
                    }
                }

                setTimeout(() => {
                    this.codeInvalid.set(false);
                }, 3000);
            });
        }
    }

    // Enviar formulario a nodejs
    public sendForm() : void{

        this.accessForm.patchValue({
            correo : this.data.email
        });

        this._authService.loginUserWithCode(this.accessForm.value).subscribe({
            next : (response) => {
                this._alertService.alertOk(response.message, 5000);
                setTimeout(() => {
                    this.closeDialog();
                }, 5001);

                this.redirectHomePage();
            },
            error : (err) => {
                this._alertService.alertError(err.error.message, 5000);
            }
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