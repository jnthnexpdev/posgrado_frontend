import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

import { AlertService } from '../../../shared/services/alerts/alert.service';
import { TesisService } from '../../../shared/services/tesis/tesis.service';
import { Period } from '../../../shared/interfaces/periods.interface';
import { PeriodService } from '../../../shared/services/periods/period.service';

@Component({
  selector: 'app-register-tesis',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule ],
  templateUrl: './register-tesis.component.html',
  styleUrl: './register-tesis.component.css'
})
export class RegisterTesisComponent implements OnInit{

    public btnDisable = signal(false);
    public titleInvalid = signal(false);
    public areaInvalid = signal(false);
    public periodInvalid = signal(false);
  
    public periodo : string = '';
    periods : Period[] = [];

    public registerTesisForm !: FormGroup;
    
    constructor(
        private formBuilder : FormBuilder,
        private dialog : Dialog,
        private _alertService : AlertService,
        private _tesisService : TesisService,
        private _periodService : PeriodService
    ){
      this.registerTesisForm = this.formBuilder.group({
        titulo : ['', [
          Validators.required,
          Validators.minLength(5), // Mínimo 5 caracteres
          Validators.maxLength(300), // Máximo 300 caracteres
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\ -]+$/)
        ]],
        areaConocimiento : ['', [
          Validators.required,
          Validators.minLength(5), // Mínimo 5 caracteres
          Validators.maxLength(300), // Máximo 300 caracteres
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\ -]+$/)
        ]],
        periodo : ['', [ Validators.required ]]
      });
    }

    ngOnInit(): void{
      this.getPeriodList();
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
        }, 5000);
    }

    // Obtener listado de periodos
    private getPeriodList() : void{
      this._periodService.getPeriodsInfo('').subscribe({
        next : (response) => {
          this.periods = response.periods;
        }
      });
    }

    // Validar formulario
    public validateForm() : void{
      this.disableBtn() 
      if(this.registerTesisForm.valid){
        this.sendForm();
      }else{
        Object.keys(this.registerTesisForm.controls).forEach(key => {
            const control = this.registerTesisForm.get(key);
                if(control?.invalid){
                  switch(key){
                    case 'titulo' : this.titleInvalid.set(true); break;
                    case 'areaConocimiento' : this.areaInvalid.set(true); break;
                    case 'periodo' : this.periodInvalid.set(true); break;
                  }
              
                setTimeout(() => {
                  this.titleInvalid.set(false);
                  this.areaInvalid.set(false);
                  this.periodInvalid.set(false);
                }, 3000);
            }
        })
      }
    }

    // Enviar formulario a nodejs
    public sendForm() : void{
      this._tesisService.registerTesis(this.registerTesisForm.value).subscribe({
        next : (response) => {
          if(response.success === true){
            this._alertService.alertOk(response.message, 3500);

            setTimeout(() => {
              window.location.reload();
            }, 3510);
          }
        },
        error : (err) => {
          this._alertService.alertError(err.error.message, 3500);
        }
      });
    }
}