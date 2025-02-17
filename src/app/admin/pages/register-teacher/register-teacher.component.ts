import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { AlertService } from '../../../shared/services/alerts/alert.service';
import { TeacherService } from '../../../shared/services/teachers/teacher.service';

@Component({
  selector: 'app-register-teacher',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, MatTooltip ],
  templateUrl: './register-teacher.component.html',
  styleUrl: './register-teacher.component.css'
})
export class RegisterTeacherComponent implements OnInit{

  public showPassword = signal(false);
  public showPassword2 = signal(false);
  public btnDisable = signal(false);
  public nameInvalid = signal(false);
  public emailInvalid = signal(false);
  public passwordInvalid = signal(false);
  public password2Invalid = signal(false);
  public registerTeacherForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private _alertService : AlertService,
    private _teacherService : TeacherService
  )
  {
    this.registerTeacherForm = this.formBuilder.group({
      nombre : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{10,60}$/)]],
      correo : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password : ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{8,25}$/)]],
      confirmPassword : ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{8,25}$/)]]
    });
  }

  ngOnInit(): void {
  }

  public backToTeachersPage() : void{
    this.router.navigate(['/coordinacion/asesores']);
  }

  public togglePassword() : void{
    this.showPassword.set(!this.showPassword());
  }

  public togglePassword2() : void{
    this.showPassword2.set(!this.showPassword2());
  }

  public disableBtn() : void{
    this.btnDisable.set(true);
    setTimeout(() => {
      this.btnDisable.set(false);
    }, 3000);
  }

  public validateForm() : void{
    this.disableBtn();

    if(this.registerTeacherForm.valid){
      if(this.registerTeacherForm.get('password')?.value != this.registerTeacherForm.get('confirmPassword')?.value){
        this._alertService.alertError('Las contraseñas no coinciden', 5000);
        return;
      }

      this.sendForm();
    }else{
      Object.keys(this.registerTeacherForm.controls).forEach(key => {
        const control = this.registerTeacherForm.get(key);

        if(control?.invalid){
          switch(key){
            case 'nombre' : this.nameInvalid.set(true); break;
            case 'correo' : this.emailInvalid.set(true); break;
            case 'password' : this.passwordInvalid.set(true); break;
            case 'confirmPassword' : this.password2Invalid.set(true); break;
          }
        }

        setTimeout(() => {
          this.nameInvalid.set(false);
          this.emailInvalid.set(false);
          this.passwordInvalid.set(false);
          this.password2Invalid.set(false);
        }, 3000);
      })
    }
  }

  public sendForm() : void{
    this._teacherService.registerNewStudent(this.registerTeacherForm.value).subscribe({
      next : (response) => {
        this._alertService.alertOk(response.message, 3000);

        setTimeout(() => {
          this.router.navigate(['/coordinacion/asesores']).then(() => {
            window.location.reload();
          })
        }, 3001);
      },
      error : (err) => {
        this._alertService.alertError(err.error.message, 5000);
      }
    })
  }

}