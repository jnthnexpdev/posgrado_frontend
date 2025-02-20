import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

import { AlertService } from '../../../shared/services/alerts/alert.service';

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
    public registerTesisForm !: FormGroup;
    
    constructor(
        private formBuilder : FormBuilder,
        private dialog : Dialog,
        private _alertService : AlertService,
    ){
        this.registerTesisForm = this.formBuilder.group({
            
        });
    }

    ngOnInit(): void{}   

    // Cerrar dialogo
    public closeDialog() : void{
        this.dialog.closeAll();
    }

    // Descativar boton para evitar multiples peticiones
    public disableBtn() : void{
        this.btnDisable.set(true);
        setTimeout(() => {
            this.btnDisable.set(false);
        }, 5000);
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
                  }
              
                setTimeout(() => {
                  this.titleInvalid.set(false);
                }, 3000);
            }
        })
      }
    }

    // Enviar formulario a nodejs
    public sendForm() : void{
    }
}