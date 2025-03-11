import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';

import { Assignment } from '../../../shared/interfaces/assignments.interface';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { AssignmentService } from '../../../shared/services/assignments/assignment.service';
import { RevisionService } from '../../../shared/services/revision/revision.service';
import { Revision } from '../../../shared/interfaces/revisions.interface';
import { AssignRatingComponent } from '../../components/assign-rating/assign-rating.component';


@Component({
  selector: 'app-list-revisions',
  standalone: true,
  imports: [ MatTooltip, FormsModule ],
  templateUrl: './list-revisions.component.html',
  styleUrl: './list-revisions.component.css'
})
export class ListRevisionsComponent implements OnInit{

  public idAssignment !: string;
  assignment !: Assignment;
  revisions : Revision[] = [];
  public requestCompleted = signal(false);

  constructor(
    private dialog : MatDialog,
    private router : Router,
    private route : ActivatedRoute,
    private _assignmentService : AssignmentService,
    private _alertService : AlertService,
    private _revisionService : RevisionService
  ){}

  ngOnInit(): void {
    this.getIdFormUrl();
    this.getAssignment();
    this.getAllRevisions();
  }

  // Ver entregas de una asignacion
  redirectRevisions(id : string) : void{
    this.router.navigate([`/asesor/lista-entregas-alumnos/${id}`]);
  }

  // Obtener el id de la asignacion desde la url
  private getIdFormUrl() : void{
    this.idAssignment = this.route.snapshot.paramMap.get('id') || '';
  }

  // Abrir dialogo para asignar calificacion a la entrega de un alumno
  updateRating(id : string) : void{
    this.dialog.open(AssignRatingComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px',
      data : { idAssignment : this.idAssignment, idRevision : id }
    });
  }

  // Obtener asignaciones
  getAssignment() : void{
    this._assignmentService.searchAssignment(this.idAssignment).subscribe({
      next  : (response) => {
        this.assignment = response.assignment;
      }
    })
  }

  getAllRevisions() : void{
    this._revisionService.getAllRevisionsOfAssignment(this.idAssignment).subscribe({
      next  : (response) => {
        this.revisions = response.revisions;

        setTimeout(() => {
          this.requestCompleted.set(true);
        }, 2000);

        console.log(this.revisions);
      },
      error : (err) => {
        setTimeout(() => {
          this.revisions = [];
          this.requestCompleted.set(true);
        }, 2000);
      }
    })
  }

}