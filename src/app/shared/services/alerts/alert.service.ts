import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertOkComponent } from '../../components/alert-ok/alert-ok.component';
import { AlertErrorComponent } from '../../components/alert-error/alert-error.component';
import { AlertConfirmationComponent } from '../../components/alert-confirmation/alert-confirmation.component';
import { AlertLoadingComponent } from '../../components/alert-loading/alert-loading.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog : MatDialog){}

  // Mostrar alerta de ok 
  alertOk(message : string, duration : number) : void{
    const dialogRef = this.dialog.open(AlertOkComponent, {
      minWidth : '200px',
      width: '200px',
      maxWidth: 'none',
      data : { message },
    });
    
    setTimeout(() => dialogRef.close(), duration);
  }

  // Mostrar alerta con elemento de carga
  alertLoading(message : string, duration : number) : void{
    const dialogRef = this.dialog.open(AlertLoadingComponent, {
      minWidth : '200px',
      width: '200px',
      maxWidth: 'none',
      data : { message },
    });
    
    setTimeout(() => dialogRef.close(), duration);
  }

  // Mostrar alerta de error
  alertError(message : string, duration : number) : void{
    const dialogRef = this.dialog.open(AlertErrorComponent, {
      minWidth : '250px',
      width: '250px',
      maxWidth: 'none',
      data : { message }
    });

    setTimeout(() => dialogRef.close(), duration);
  }

  // Mostrar alerta de confirmacion
  alertConfirmation(message : string, subject : string, id : string, duration : number) : void{
    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      minWidth : '280px',
      width: '280px',
      maxWidth: 'none',
      data : { message, subject, id }
    });

    setTimeout(() => dialogRef.close(), duration);
  }

}