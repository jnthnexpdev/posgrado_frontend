import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

import { UploadStudentsComponent } from '../../components/upload-students/upload-students.component';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { StudentService } from '../../../shared/services/students/student.service';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { Period } from '../../../shared/interfaces/periods.interface';


@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, MatTooltip, FormsModule ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css'
})
export class RegisterStudentComponent implements OnInit{

  public showPassword = signal(false);
  public btnDisable = signal(false);
  public nameInvalid = signal(false);
  public controlNumberInvalid = signal(false);
  public emailInvalid = signal(false);
  public passwordInvalid = signal(false);
  public periodInvalid = signal(false);
  public periodo : string = '';
  public registerStudentForm !: FormGroup;
  periods : Period[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private dialog : MatDialog,
    private router : Router,
    private alertService : AlertService,
    private _studentService : StudentService,
    private _periodService : PeriodService
  ){
    this.registerStudentForm = this.formBuilder.group({
      nombre : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{10,60}$/)]],
      numeroControl : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}$/)]],
      correo : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password : ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{8,25}$/)]],
    });
  }

  ngOnInit(): void {
    this.getPeriodList();
  }

  public backToStudentsPage() : void{
    this.router.navigate(['/coordinacion/alumnos']);
  }

  public togglePassword() : void{
    this.showPassword.set(!this.showPassword());
  }

  public openDialogUpload() : void{
    this.dialog.open(UploadStudentsComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    })
  }

  public disableBtn() : void{
    this.btnDisable.set(true);
    setTimeout(() => {
      this.btnDisable.set(false);
    }, 3000);
  }

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

  public validateForm() : void{
    this.disableBtn();

    if(this.registerStudentForm.valid && this.periodo != ''){
      this.sendForm();  
    }else{
      Object.keys(this.registerStudentForm.controls).forEach(key => {
        const control = this.registerStudentForm.get(key);

        if(control?.invalid){
          switch(key){
            case 'nombre' : this.nameInvalid.set(true); break;
            case 'numeroControl' : this.controlNumberInvalid.set(true); break;
            case 'correo' : this.emailInvalid.set(true); break;
            case 'password' : this.passwordInvalid.set(true); break;
          }
        }

        if(this.periodo === ''){
          this.periodInvalid.set(true);
        }

        setTimeout(() => {
          this.nameInvalid.set(false);
          this.controlNumberInvalid.set(false);
          this.emailInvalid.set(false);
          this.passwordInvalid.set(false);
          this.periodInvalid.set(false);
        }, 3000);
      })
    }
  }

  public sendForm() : void{
    this._studentService.registerNewStudent(this.registerStudentForm.value).subscribe({
      next : (response) => {
        this.alertService.alertOk(response.message, 2500);
        setTimeout(() => {
          this.addNewStudentToPeriod(response.studentId, this.periodo);
        }, 2501);
      },
      error : (err) => {
        this.alertService.alertError(err.error.message, 5000);
      }
    });
  }

  public addNewStudentToPeriod(idStudent : string, idPeriod : string) : void {
    this._periodService.addStudentToPeriod(idStudent, idPeriod).subscribe({
      next : (response) => {
        this.alertService.alertOk(response.message, 2500);
      },
      error : (err) => {
        this.alertService.alertError(err.error.message, 2500);
      }
    })
  }

}