import { Dialog } from '@angular/cdk/dialog';
import {ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';


import { AlertService } from '../../../shared/services/alerts/alert.service';
import { Period } from '../../../shared/interfaces/periods.interface';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { AssignmentService } from '../../../shared/services/assignments/assignment.service';


@Component({
  selector: 'app-assing-revision',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssingRevisionComponent implements OnInit{
  public btnDisable = signal(false);
  public titleInvalid = signal(false);
  public descriptionInvalid = signal(false);
  public dateRevisionInvalid = signal(false);
  public periodInvalid = signal(false);

  public periodo : string = '';
  periods : Period[] = [];

  public newRevisionForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private dialog : Dialog,
    private router : Router,
    private _alertService : AlertService,
    private _periodService : PeriodService,
    private _assignmentService : AssignmentService,

    private dateAdapter: DateAdapter<Date>,
  ){
    this.dateAdapter.setLocale('en-GB'); // dd/MM/yyyy
    this.dateAdapter.getDayOfWeekNames('narrow');

    this.newRevisionForm = this.formBuilder.group({
      nombre : ['', [
        Validators.required,
        Validators.minLength(5), // Mínimo 5 caracteres
        Validators.maxLength(300), // Máximo 300 caracteres
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\ -]+$/)
      ]],
      descripcion : ['', [
        Validators.required,
        Validators.minLength(5), // Mínimo 5 caracteres
        Validators.maxLength(300), // Máximo 300 caracteres
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\ -]+$/)
      ]],
      fechaLimite : ['',],
      periodo : ['',],
    });
  }

  ngOnInit(): void {
    this.getPeriodList();
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
        if (this.periods.length > 0) {
          this.newRevisionForm.patchValue({
            periodo : this.periods[this.periods.length - 1].periodo
          })
        }
      },
      error : (err) => {
        console.error('Error al obtener la lista de periodos: ', err.error.message);
      }
    });
  }

  // Formatear la fecha dd-mm-aaaa
  private getDate(): string {
    const date: Date = this.newRevisionForm.get('fechaLimite')?.value;
    if (date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses van de 0 a 11
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return '';
  }  

  // Validar formulario
  public validateForm() : void{
    this.disableBtn(); 
    this.getDate();

    if(this.newRevisionForm.valid){
      const fechaFormateada = this.getDate();
      console.log('Fecha a enviar:', fechaFormateada);
      this.sendForm(fechaFormateada);
    }else{
      Object.keys(this.newRevisionForm.controls).forEach(key => {
        const control = this.newRevisionForm.get(key);
          if(control?.invalid){
            switch(key){
              case 'nombre' : this.titleInvalid.set(true); break;
              case 'descripcion' : this.descriptionInvalid.set(true); break;
              case 'fechaLimite' : this.dateRevisionInvalid.set(true); break;
              case 'periodo' : this.periodInvalid.set(true); break;
            }
        
            setTimeout(() => {
              this.titleInvalid.set(false);
              this.descriptionInvalid.set(false);
              this.dateRevisionInvalid.set(false);
              this.periodInvalid.set(false);
            }, 3000);
          }
      });
    }
  }
  
  // Enviar formulario a nodejs
  public sendForm(dateFormated: string): void {
    const formData = { 
      ...this.newRevisionForm.value,
      fechaLimite: dateFormated
    };
    
    this._assignmentService.createAssignment(formData).subscribe({
      next : (response) => {
        this._alertService.alertOk(response.message, 2500);

        setTimeout(() => {
          this.router.navigate(['/asesor/asignaciones']).then(() => {
            window.location.reload();
          })
        }, 2600);
      },
      error : (err) => {
        this._alertService.alertError(err.error.message, 3500);
      }
    })
  }

}