import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TeacherService } from '../../services/teachers/teacher.service';
import { StudentService } from '../../services/students/student.service';
import { AlertService } from '../../services/alerts/alert.service';

@Component({
  selector: 'app-alert-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './alert-confirmation.component.html',
  styleUrl: './alert-confirmation.component.css'
})
export class AlertConfirmationComponent implements OnInit{

  public btnText : string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : { message : string, subject : string, id : string },
    private dialog : Dialog,
    private _teacherService : TeacherService,
    private _studentService : StudentService,
    private _alertService : AlertService
  ){}

  ngOnInit(): void {
    this.validateSubject();
  };

  public closeDialog() : void{
    this.dialog.closeAll();
  }

  private validateSubject() : void{
    switch(this.data.subject){
      case 'borrarAlumno' : 
        this.btnText = 'Eliminar';
        break;
      case 'borrarAsesor' : 
        this.btnText = 'Eliminar';
        break;
    };
  }

  public confirmAction() : void{
    switch(this.data.subject){
        case 'borrarAlumno' : 
            this._studentService.deleteStudent(this.data.id).subscribe({
                next : (response) => {
                    this._alertService.alertOk(response.message, 3500);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3501);
                },
                error : (err) => {
                    this._alertService.alertError(err.error.message, 3500);
                }
            });
            break;
        case 'borrarAsesor' : 
            this._teacherService.deleteTeacher(this.data.id).subscribe({
                next : (response) => {
                    this._alertService.alertOk(response.message, 3500);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3501);
                },
                error : (err) => {
                    this._alertService.alertError(err.error.message, 3500);
                }
            });
        break;
    };
  }

}