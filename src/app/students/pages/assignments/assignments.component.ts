import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssignmentService } from '../../../shared/services/assignments/assignment.service';
import { Assignment } from '../../../shared/interfaces/assignments.interface';
import { Period } from '../../../shared/interfaces/periods.interface';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { AlertService } from '../../../shared/services/alerts/alert.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [ NgClass, FormsModule ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{

  public expandDetails = signal(false);
  public assignments : Assignment[] = [];
  public selectedFilter : string = '';
  public filteredAssignments: Assignment[] = [];
  public period : string = '';
  public periods : Period[] = [];

  constructor(
    private router : Router,
    private _assignmentService : AssignmentService,
    private _periodService : PeriodService,
    private _alertService : AlertService,
  ){}

  ngOnInit(): void {
    this.getAssignments();
    this.getPeriodList();
  }

  // Obtener el listado de periodos para filtrar las asignaciones
  private getPeriodList() : void{
    this._periodService.getPeriodsInfo('').subscribe({
      next : (response) => {
        this.periods = response.periods;
        if (this.periods.length > 0) {
          this.period = this.periods[this.periods.length - 1].periodo;
        }
      }
    });
  }

  // Ver mas detalles de una asignacion
  viewDetails(id : string, available : boolean) : void{
    if(available === false){
      this._alertService.alertError('La fecha limite de entrega ha pasado', 5000);
      return;
    }

    this.router.navigate([`/alumno/detalles-asignacion/${id}`]).then(() => {});
  }

  // Obtener todas las asignaciones del alumno
  public getAssignments() : void{
    this._assignmentService.getAssignmentsOfStudent(this.period).subscribe({
      next : (response) => {
        this.assignments = response.assignments;
        this.applyFilter(this.selectedFilter);
      }
    })
  }

  // Filtrar las asignaciones por estatus
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