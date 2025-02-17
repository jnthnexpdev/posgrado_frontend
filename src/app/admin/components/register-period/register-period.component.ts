import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';

import { AlertService } from '../../../shared/services/alerts/alert.service';
import { PeriodService } from '../../../shared/services/periods/period.service';

@Component({
  selector: 'app-register-period',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, FormsModule ],
  templateUrl: './register-period.component.html',
  styleUrl: './register-period.component.css'
})
export class RegisterPeriodComponent implements OnInit{

    public btnDisable = signal(false);
    public periodInvalid = signal(false);
    public registerPeriodForm !: FormGroup;
    
    constructor(
        private formBuilder : FormBuilder,
        private dialog : Dialog,
        private _alertService : AlertService,
        private _periodService : PeriodService
    ){
        this.registerPeriodForm = this.formBuilder.group({
            periodo: [
              '',
              [
                Validators.required,
                Validators.pattern(/^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre) - (Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre) \d{4}$/)
              ]
            ]
        });
    }

    ngOnInit(): void{}   

    public closeDialog() : void{
        this.dialog.closeAll();
    }

    public disableBtn() : void{
        this.btnDisable.set(true);
        setTimeout(() => {
            this.btnDisable.set(false);
        }, 5000);
    }

    public validateForm() : void{
      this.disableBtn() 
      if(this.registerPeriodForm.valid){
        this.sendForm();
      }else{
        Object.keys(this.registerPeriodForm.controls).forEach(key => {
            const control = this.registerPeriodForm.get(key);
                if(control?.invalid){
                  switch(key){
                    case 'periodo' : this.periodInvalid.set(true); break;
                  }
              
                setTimeout(() => {
                  this.periodInvalid.set(false);
                }, 3000);
            }
        })
      }
    }

    public sendForm() : void{
        this._periodService.registerPeriod(this.registerPeriodForm.value).subscribe({
            next : (response) => {
                this._alertService.alertOk(response.message, 5000);
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
            },
            error : (err) => {
                this._alertService.alertError(err.error.message, 5000);
            }
        });
    }
}