import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from '../../../shared/services/assignments/assignment.service';
import { Assignment } from '../../../shared/interfaces/assignments.interface';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{

  public expandDetails = signal(false);
  public assignments : Assignment[] = [];

  constructor(
    private router : Router,
    private _assignmentService : AssignmentService,
  ){}

  ngOnInit(): void {
    this.getAssignments();
  }

  public expandCard() : void{
    this.expandDetails.set(!this.expandDetails());
  }

  viewDetails(id : string) : void{
    this.router.navigate([`/alumno/detalles-asignacion/${id}`]).then(() => {});
  }

  private getAssignments() : void{
    this._assignmentService.getAssignmentsOfStudent('Enero - Junio 2025').subscribe({
      next : (response) => {
        this.assignments = response.assignments;
        console.log('Asignaciones: ', response);
      }
    })
  }

}
