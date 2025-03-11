import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from '../../../shared/services/assignments/assignment.service';
import { Assignment } from '../../../shared/interfaces/assignments.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{

  public expandDetails = signal(false);
  public assignments : Assignment[] = [];
  public selectedFilter : string = '';
  public filteredAssignments: Assignment[] = [];

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
        this.applyFilter(this.selectedFilter);
      }
    })
  }

  applyFilter(filter: string) {
    this.selectedFilter = filter;

    switch (filter) {
      case 'Calificadas':
        this.filteredAssignments = this.assignments.filter(a => a.estatusEntrega === 'Calificada');
        break;
      case 'Entregadas':
        this.filteredAssignments = this.assignments.filter(a => a.estatusEntrega === 'Entregada');
        break;
      case 'Pendientes':
        this.filteredAssignments = this.assignments.filter(a => a.estatusEntrega === 'Pendiente');
        break;
      default:
        this.filteredAssignments = [...this.assignments]; // Mostrar todas
    }
  }

}
