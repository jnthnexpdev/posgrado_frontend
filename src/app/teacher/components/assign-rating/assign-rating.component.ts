import { Component, Inject, OnInit, signal } from '@angular/core';
import { RevisionService } from '../../../shared/services/revision/revision.service';
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-assign-rating',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule ],
  templateUrl: './assign-rating.component.html',
  styleUrl: './assign-rating.component.css'
})
export class AssignRatingComponent implements OnInit{

  public btnDisable = signal(false);
  public ratingInvalid = signal(false);
  public ratingForm !: FormGroup;

  constructor(
    private dialog : Dialog,
    private formBuilder : FormBuilder,
    private router : Router,
    private _revisionService : RevisionService,
    private _alertService : AlertService,
    @Inject(DIALOG_DATA) public data: { idAssignment : string, idRevision: string },
  ){
    this.ratingForm = this.formBuilder.group({
      calificacion: ['', [Validators.required, Validators.pattern(/^(100(?:\.0{1,2})?|[0-9]{1,2}(?:\.\d{1,2})?)$/)]],
    });    
  }

  ngOnInit(): void {
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

    if(this.ratingForm.valid){
      this.sendForm();
    }else{
      Object.keys(this.ratingForm.controls).forEach(key => {
        const control = this.ratingForm.get(key);

        if(control?.invalid){
          switch(key){
            case 'numeroControl' : this.ratingInvalid.set(true); break;
          }
        }

        setTimeout(() => {
          this.ratingInvalid.set(false);
        }, 3000);
      })
    }
  }

  private sendForm() : void{
    this._revisionService.updateRatingOfRevision( this.data.idRevision ,this.ratingForm.value).subscribe({
      next : (response) => {
        this._alertService.alertOk(response.message, 3500);
        setTimeout(() => {
          this.router.navigate([`/asesor/lista-entregas-alumnos/${this.data.idAssignment}`]).then(() => {
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