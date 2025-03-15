import { Dialog } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';


import { Period } from '../../../shared/interfaces/periods.interface';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { StudentService } from '../../../shared/services/students/student.service';

@Component({
    selector: 'app-upload-students',
    standalone: true,
    imports: [ NgClass, ReactiveFormsModule, FormsModule ],
    templateUrl: './upload-students.component.html',
    styleUrl: './upload-students.component.css'
})
export class UploadStudentsComponent implements OnInit{
    public fileInvalid = signal(false);
    public fileSelected : File | null = null;

    public showPassword = signal(false);
    public btnDisable = signal(false);

    public periodInvalid = signal(false);
    public passwordInvalid = signal(false);
    public fileSelectedInvalid = signal(false);
    
    public period : string = '';
    periods : Period[] = [];

    public registerStudentsForm !: FormGroup;

    constructor(
        private formBuilder : FormBuilder,
        private dialog : Dialog,
        private _studentService : StudentService,
        private _periodService : PeriodService,
        private _alertService : AlertService
    ){
        this.registerStudentsForm = this.formBuilder.group({
            periodo: ['', [ Validators.required]],
            password : ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{8,25}$/)]],
        });
    }

    ngOnInit(): void {
        this.getPeriodList();
    }

    // Mostrar / ocultar password
    public togglePassword() : void{
        this.showPassword.set(!this.showPassword());
    }

    // Gestionar archivo seleccionado
    onFileSelected(event: any): void {
        const file = event.target.files[0] as File;

        if (!file) {
            this.fileInvalid.set(true);
            this.fileSelected = null;
            return;
        }
    
        // Validar que sea un archivo CSV
        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            this.fileInvalid.set(true);
            this.fileSelected = null;
            
            setTimeout(() => {
                this.fileInvalid.set(false);
            }, 3000);
            
            return;
        }
    
        this.fileInvalid.set(false);
        this.fileSelected = file;
    }

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
        this.disableBtn(); 
        const isFileNotSelected = !this.fileSelected;

        // Asignar el periodo asignado al formulario
        this.registerStudentsForm.patchValue({
            periodo : this.period
        })

        // Validar si el archivo se ha selecionado
        if(isFileNotSelected){
            this.fileSelectedInvalid.set(true);

            setTimeout(() => {
                this.fileSelectedInvalid.set(false);
            }, 3000);
        }

        if(this.registerStudentsForm.valid && !isFileNotSelected){
          this.sendForm();
        }else{
          Object.keys(this.registerStudentsForm.controls).forEach(key => {
              const control = this.registerStudentsForm.get(key);
                  if(control?.invalid){
                    switch(key){
                      case 'periodo' : this.periodInvalid.set(true); break;
                      case 'password' : this.passwordInvalid.set(true); break;
                    }
                
                  setTimeout(() => {
                    this.periodInvalid.set(false);
                    this.passwordInvalid.set(false);
                  }, 3000);
              }
          })
        }
    }

    // Enviar formulario a nodejs
    public sendForm() : void{
        if (!this.fileSelected) {
            this._alertService.alertError('Selecciona un archivo CSV', 3500);
            return;
        }
    
        const formData = new FormData();
        formData.append('password', this.registerStudentsForm.get('password')?.value);
        formData.append('file', this.fileSelected);

        console.log(formData);

        this._studentService.registerStudents(this.period, formData).subscribe({
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