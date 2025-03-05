import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

import { AssignmentService } from '../../../shared/services/assignments/assignment.service';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { Assignment } from '../../../shared/interfaces/assignments.interface';
import { RevisionService } from '../../../shared/services/revision/revision.service';
import { Revision } from '../../../shared/interfaces/revisions.interface';


@Component({
  selector: 'app-assignment-details',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule ],
  templateUrl: './assignment-details.component.html',
  styleUrl: './assignment-details.component.css'
})
export class AssignmentDetailsComponent implements OnInit{

  public btnDisable = signal(false);
  public linkInvalid = signal(false);

  public assignment !: Assignment;
  public revision !: Revision;
  public idAssignment !: string;

  public revisionForm !: FormGroup;

  constructor(
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router,
    private _assignmentService : AssignmentService,
    private _revisionService : RevisionService,
    private _alertService : AlertService,
  ){
    this.revisionForm = this.formBuilder.group({
      linkEntrega : ['', [
        Validators.required,
        Validators.minLength(5), // Mínimo 5 caracteres
        Validators.maxLength(300), // Máximo 300 caracteres
      ]],
    });
  }

  ngOnInit(): void {
    this.getIdFormUrl();
    this.getAssignment();
    this.getRevision();
  }

  getIdFormUrl() : void{
    this.idAssignment = this.route.snapshot.paramMap.get('id') || '';
  }

  // Desactivar boton para evitar multiples peticiones
  public disableBtn() : void{
    this.btnDisable.set(true);
    setTimeout(() => {
        this.btnDisable.set(false);
    }, 5000);
  }

  getAssignment() : void{
    this._assignmentService.searchAssignment(this.idAssignment).subscribe({
      next : (response) => {
        this.assignment = response.assignment;
      }
    });
  }

  getRevision() : void{
    this._revisionService.getRevisionOfAssignmentByStudent(this.idAssignment).subscribe({
      next : (response) => {
        this.revision = response.revision;
        this.revisionForm.patchValue({
          linkEntrega : response.revision.linkEntrega
        });
      },
      error : (err) => {
        console.log('Error al obtener la revision: ', err);
      }
    })
  }

  // Validar formulario
  public validateForm() : void{
    this.disableBtn(); 
    if(this.revisionForm.valid){
      this.sendForm();
    }else{
      Object.keys(this.revisionForm.controls).forEach(key => {
        const control = this.revisionForm.get(key);
        if(control?.invalid){
          switch(key){
            case 'linkEntrega' : this.linkInvalid.set(true); break;
          }
      
        setTimeout(() => {
          this.linkInvalid.set(false);
        }, 3000);
        }
      })
    }
  }

  // Enviar formulario a nodejs
  public sendForm() : void{
    const formData = { 
      ...this.revisionForm.value,
      ...this.assignment
    };

    this._revisionService.registerRevision(formData).subscribe({
      next : (response) => {
        if(response.success === true){
          this._alertService.alertOk(response.message, 3500);
          setTimeout(() => {
            window.location.reload();
          }, 3510);
        }
      },
      error : (err) => {
        this._alertService.alertError(err.error.message, 3500);
      }
    });
  }

}
