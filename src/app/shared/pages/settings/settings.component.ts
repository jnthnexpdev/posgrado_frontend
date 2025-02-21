import { Component, OnInit, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';


import { AlertService } from '../../services/alerts/alert.service';
import { ChangePasswordComponent } from '../../../auth/components/change-password/change-password.component';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../auth/interfaces/user-response.types';
import { TesisService } from '../../services/tesis/tesis.service';
import { Tesis } from '../../interfaces/tesis.interface';
import { AdviseService } from '../../services/advise/advise.service';
import { StatsService } from '../../services/stats/stats.service';
import { RegisterTesisComponent } from '../../../students/components/register-tesis/register-tesis.component';
import { EditTesisComponent } from '../../../students/components/edit-tesis/edit-tesis.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ MatDividerModule, MatListModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  // Informacion usuario y tesis
  user !: User;
  tesis !: Tesis;

  // Informacion del asesor y fecha de asignacion
  advisorName : string = '';
  advisorEmail : string = '';
  dateAssignment : string = '';

  // Contador de alumnos asesorados
  countAdvised : number = 0;

  // Estadisticas del sistema
  studentCount : number = 0;
  teacherCount : number = 0;
  periodCount : number = 0;
  tesisCount : number = 0;

  // Alumno sin asesor
  public withoutAdvisor = signal(false);
  // Alumno sin tesis
  public studentWithTesis = signal(false);

  constructor(
    private dialog : MatDialog,
    private _alertService : AlertService,
    private _authService : AuthService,
    private _tesisService : TesisService,
    private _adviseService : AdviseService,
    private _statsService : StatsService
  ){}

  ngOnInit(): void {
    this.getUserData();
  }

  // Abrir dialogo para cambiar password
  openDialogPassword() : void{
    this.dialog.open(ChangePasswordComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  // Abrir dialogo para registrar una tesis
  openDialogTesis() : void{
    this.dialog.open(RegisterTesisComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  // Abrir dialogo para registrar una tesis
  openDialogEditTesis() : void{
    this.dialog.open(EditTesisComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  // Obtener informacion dependiendo el tipo de usuario
  getUserData(){
    this._authService.getUserInfo().subscribe({
      next : (response) => {
        this.user = response.user;

        switch(this.user.tipoCuenta){
          case 'Alumno' : 
            this.getStudentTesis(); 
            this.getAdvisorInfo();
            break;

          case 'Asesor' : 
            this.getCountAdvised(); 
            break;

          case 'Coordinador' : 
            this.getStatsSystem(); 
            break;
        }
      }, 
      error : (err) => {
        console.error('Error al obtener la información del usuario:', err.error.message);
      },
    })
  }

  // Obtener informacion de la tesis del alumno
  getStudentTesis() : void{
    this._tesisService.getTesisByStudent().subscribe({
      next : (response) => {
        this.tesis = response.tesis;
        this.studentWithTesis.set(true);
      }, 
      error : (err) => {
        this.studentWithTesis.set(false);
      }
    })
  }

  // Obtener la informacion del asesor de un alumno
  getAdvisorInfo() : void{
    this._adviseService.getAdvisorInfo().subscribe({
      next : (response) => {
        this.advisorName = response.assignment.nombre;
        this.advisorEmail = response.assignment.correo;
        this.dateAssignment = response.assignment.fechaAsignacion;
      },
      error : (err) => {
        this.withoutAdvisor.set(true);
      }
    })
  }

  // Obtener conteo de alumnos asesorados
  getCountAdvised() : void{
    this._adviseService.getCountStudentsAdvised().subscribe({
      next : (response) => {
        this.countAdvised = response.counter;
      }
    });
  }

    // Obtener informacion del alumno
    getStatsSystem(){
      this._statsService.getStats().subscribe({
        next : (response) => {
          this.studentCount = response.stats.studentCount;
          this.teacherCount = response.stats.teacherCount;
          this.periodCount = response.stats.periodCount;
          this.tesisCount = response.stats.tesisCount;
        }
      });
    }

}