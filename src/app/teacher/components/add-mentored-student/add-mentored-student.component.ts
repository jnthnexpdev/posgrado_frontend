import { Component, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

import { AlertService } from '../../../shared/services/alerts/alert.service';
import { AdviseService } from '../../../shared/services/advise/advise.service';
import { Period } from '../../../shared/interfaces/periods.interface';
import { PeriodService } from '../../../shared/services/periods/period.service';

@Component({
  selector: 'app-add-mentored-student',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, FormsModule ],
  templateUrl: './add-mentored-student.component.html',
  styleUrl: './add-mentored-student.component.css'
})
export class AddMentoredStudentComponent implements OnInit{

  public btnDisable = signal(false);
  public controlNumberInvalid = signal(false);
  public periodInvalid = signal(false);
  public periods : Period[] = [];
  public registerAdvisedForm !: FormGroup;

  constructor(
    private dialog : Dialog,
    private formBuilder : FormBuilder,
    private router : Router,
    private _adviseService : AdviseService,
    private _periodService : PeriodService,
    private _alertService : AlertService,
  ){
    this.registerAdvisedForm = this.formBuilder.group({
      numeroControl : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}$/)]],
      periodo : ['', [Validators.required]],
      notas : [''],
    });
  }

  ngOnInit(): void {
    this.getPeriodList();
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

  private disableBtn() : void{
    this.btnDisable.set(true);
    setTimeout(() => {
      this.btnDisable.set(false);
    }, 3000);
  }

  public closeDialog() : void{
    this.dialog.closeAll();
  }

  public validateForm() : void{
    this.disableBtn();

    if(this.registerAdvisedForm.valid){
      this.sendForm();
    }else{
      Object.keys(this.registerAdvisedForm.controls).forEach(key => {
        const control = this.registerAdvisedForm.get(key);

        if(control?.invalid){
          switch(key){
            case 'numeroControl' : this.controlNumberInvalid.set(true); break;
            case 'periodo' : this.periodInvalid.set(true); break; break;
          }
        }

        setTimeout(() => {
          this.controlNumberInvalid.set(false);
          this.periodInvalid.set(false);
        }, 3000);
      })
    }
  }

  private sendForm() : void{
    this._adviseService.registerStudentAdvised(this.registerAdvisedForm.value).subscribe({
      next : (response) => {
        this._alertService.alertOk(response.message, 3500);
        setTimeout(() => {
          this.router.navigate(['/asesor/alumnos-asesorados']).then(() => {
            window.location.reload()
          })
        },3501); 
      },
      error : (err) => {
        this._alertService.alertError(err.error.message, 5000);
      }
    });
  }

}