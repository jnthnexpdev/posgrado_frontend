import { Component, OnInit, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AlertService } from '../../services/alerts/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../auth/components/change-password/change-password.component';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../auth/interfaces/user-response.types';
import { TesisService } from '../../services/tesis/tesis.service';
import { Tesis } from '../../interfaces/tesis.interface';
import { AdviseService } from '../../services/advise/advise.service';
import { StatsService } from '../../services/stats/stats.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ MatDividerModule, MatListModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  user !: User;
  tesis !: Tesis;

  advisorName : string = '';
  advisorEmail : string = '';
  dateAssignment : string = '';

  countAdvised : number = 0;

  studentCount : number = 0;
  teacherCount : number = 0;
  periodCount : number = 0;
  tesisCount : number = 0;

  public withoutAdvisor = signal(false);

  constructor(
    private _alertService : AlertService,
    private dialog : MatDialog,
    private _authService : AuthService,
    private _tesisService : TesisService,
    private _adviseService : AdviseService,
    private _statsService : StatsService
  ){}

  ngOnInit(): void {
    this.getUserData();
  }

  openDialogPassword() : void{
    this.dialog.open(ChangePasswordComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  // Obtener informacion del alumno
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
      }, 
      error : (err) => {
        this._alertService.alertError(err.error.message, 3500);
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