import { Dialog } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';


import { Period } from '../../../shared/interfaces/periods.interface';
import { StudentService } from '../../../shared/services/students/student.service';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { AlertService } from '../../../shared/services/alerts/alert.service';

@Component({
  selector: 'app-add-students-period',
  standalone: true,
  imports: [ NgClass, FormsModule ],
  templateUrl: './add-students-period.component.html',
  styleUrl: './add-students-period.component.css'
})
export class AddStudentsPeriodComponent implements OnInit{
    public fileInvalid = signal(false);
    public fileSelected : File | null = null;

    public btnDisable = signal(false);
    public periodInvalid = signal(false);
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
            periodo: ['', [ Validators.required]]
        });
    }

    ngOnInit(): void {
        this.getPeriodList();
    }

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
            },
            error : (err) => {
                console.error('Error al obtener la lista de periodos: ', err.error.message);
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
                    }
                
                  setTimeout(() => {
                    this.periodInvalid.set(false);
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
        formData.append('file', this.fileSelected);

        this._periodService.addStudentsToPeriod(this.period, formData).subscribe({
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