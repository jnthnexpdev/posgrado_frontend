import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AlertService } from '../../services/alerts/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../auth/components/change-password/change-password.component';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../auth/interfaces/user-response.types';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ MatDividerModule, MatListModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  user !: User;

  constructor(
    private _alertService : AlertService,
    private dialog : MatDialog,
    private _authService : AuthService
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

  getUserData(){
    this._authService.getUserInfo().subscribe({
      next : (response) => {
        this.user = response.user;
        console.log('Información del usuario:', this.user);
      }, 
      error : (err) => {
        console.error('Error al obtener la información del usuario:', err.error.message);
      },
    })
  }

}