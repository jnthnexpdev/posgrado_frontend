import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AlertService } from '../../services/alerts/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../auth/components/change-password/change-password.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ MatDividerModule, MatListModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  constructor(
    private alertService : AlertService,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
  }

  openDialogPassword() : void{
    this.dialog.open(ChangePasswordComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

}