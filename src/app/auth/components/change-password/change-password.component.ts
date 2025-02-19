import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';

import { AlertService } from '../../../shared/services/alerts/alert.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, MatTooltip, FormsModule ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{

  public showPassword = signal(false);
  public showPassword2 = signal(false);
  public passwordInvalid = signal(false);
  public password2Invalid = signal(false);
  public btnDisable = signal(false);
  public passwordForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private dialog : Dialog,
    private _alertService : AlertService,
    private _authService : AuthService
  ){
    this.passwordForm = this.formBuilder.group({
      password : ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{8,25}$/)]],
      confirmPassword : ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{8,25}$/)]]
    });
  }

  ngOnInit(): void { 
  }

  // Mostrar / ocultar password
  public togglePassword() : void{
    this.showPassword.set(!this.showPassword());
  }

  // Mostrar / ocultar password 2
  public togglePassword2() : void{
    this.showPassword2.set(!this.showPassword2());
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

    if(this.passwordForm.valid){
      if(this.passwordForm.get('password')?.value != this.passwordForm.get('confirmPassword')?.value){
        this._alertService.alertError('Las contraseñas no coinciden', 5000);
        return;
      }

      this.sendForm();
    }else{
      Object.keys(this.passwordForm.controls).forEach(key => {
        const control = this.passwordForm.get(key);

        if(control?.invalid){
          switch(key){
            case 'password' : this.passwordInvalid.set(true); break;
            case 'confirmPassword' : this.password2Invalid.set(true); break;
          }
        }

        setTimeout(() => {
          this.passwordInvalid.set(false);
          this.password2Invalid.set(false);
        }, 3000);
      })
    }
  }

  // Enviar formulario a nodejs
  public sendForm() : void{
    this._authService.changePassword(this.passwordForm.value).subscribe({
      next : (response) => {
        this._alertService.alertOk(response.message, 5000);
        setTimeout(() => {
          this.closeDialog();
        }, 5001);
      },
      error : (err) => {
        this._alertService.alertError(err.error.message, 5000);
      }
    });
  }

}