import { Component, OnInit, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';


import { ChangePasswordComponent } from '../../../auth/components/change-password/change-password.component';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../auth/interfaces/user-response.types';
import { TesisService } from '../../services/tesis/tesis.service';
import { Tesis } from '../../interfaces/tesis.interface';
import { AdviseService } from '../../services/advise/advise.service';
import { StatsService } from '../../services/stats/stats.service';
import { RegisterTesisComponent } from '../../../students/components/register-tesis/register-tesis.component';
import { EditTesisComponent } from '../../../students/components/edit-tesis/edit-tesis.component';
import { PublicationsService } from '../../services/publications/publications.service';
import { Publication } from '../../interfaces/publications.interface';
import { StudentProfileComponent } from "../../../students/components/student-profile/student-profile.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatDividerModule, MatListModule, StudentProfileComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  // Informacion usuario y tesis
  user !: User;

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
  // Tesis y publicacion alumno
  public studentWithTesis = signal(false);
  public studentWithPublication= signal(false);

  constructor(
    private dialog : MatDialog,
    private _authService : AuthService,
    private _tesisService : TesisService,
    private _adviseService : AdviseService,
    private _statsService : StatsService,
    private _publicationService : PublicationsService,
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

  // Obtener informacion dependiendo el tipo de usuario
  getUserData(){
    this._authService.getUserInfo().subscribe({
      next : (response) => {
        this.user = response.user;

        switch(this.user.tipoCuenta){
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