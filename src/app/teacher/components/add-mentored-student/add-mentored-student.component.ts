import { Component, OnInit, signal } from '@angular/core';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdviseService } from '../../../shared/services/advise/advise.service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-mentored-student',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule ],
  templateUrl: './add-mentored-student.component.html',
  styleUrl: './add-mentored-student.component.css'
})
export class AddMentoredStudentComponent implements OnInit{

  public btnDisable = signal(false);
  public controlNumberInvalid = signal(false);
  public periodInvalid = signal(false);
  public registerAdvisedForm !: FormGroup;

  constructor(
    private alertService : AlertService,
    private formBuilder : FormBuilder,
    private _adviseService : AdviseService,
    private dialog : Dialog,
  ){
    this.registerAdvisedForm = this.formBuilder.group({
      numeroControl : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}$/)]],
      periodo : ['', [Validators.required]],
      notas : [''],
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
        this.alertService.alertOk(response.message, 5000);
      },
      error : (err) => {
        this.alertService.alertError(err.error.message, 5000);
      }
    })
  }

}