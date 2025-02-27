import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { AssingRevisionComponent } from '../../components/add-assignment/add-assignment.component';
import { AssignmentService } from '../../../shared/services/assignments/assignment.service';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { Assignment } from '../../../shared/interfaces/assignments.interface';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { EditAssignmentComponent } from '../../components/edit-assignment/edit-assignment.component';

@Component({
  selector: 'app-revisions',
  standalone: true,
  imports: [ NgClass, MatTooltip ],
  templateUrl: './list-assignments.component.html',
  styleUrl: './list-assignments.component.css'
})
export class ListAssignmentsComponent implements OnInit{

  pagination: Pagination = {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  };
  pages : number[] = [];
  public period : string = '';
  assignments : Assignment[] = [];
  public requestCompleted = signal(false);

  constructor(
    private dialog : MatDialog,
    private router : Router,
    private _assignmentService : AssignmentService,
    private _alertService : AlertService
  ){}

  ngOnInit(): void {
    this.getAssignments();
  }

  // Abrir dialogo para registrar una nueva asignacion
  newAssignment() : void{
    this.dialog.open(AssingRevisionComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  // Abrir dialogo para editar la asignacion
  editAssignment(id : string) : void{
    this.dialog.open(EditAssignmentComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px',
      data : { idAssignment : id }
    });
  }

  // Abrir dialogo para confirmar eliminacion
  deleteAssignment(id : string) : void{
    this._alertService.alertConfirmation('Deseas eliminar esta asignacion?', 'borrarAsignacion', id, 20000);
  }

  // Ver detalles de la asignacion
  viewDetails(id : number) : void{
    this.router.navigate([`/asesor/detalles-revision/${id}`]).then(() => {});
  }

  // Obtener asignaciones
  getAssignments() : void{
    this._assignmentService.getAssignmentsByPeriod('Enero - Junio 2025').subscribe({
      next  : (response) => {
        this.assignments = response.assignments;
        console.log(this.assignments);
        this.pagination = response.pagination;
        this.requestCompleted.set(true);
        this.calculatePages();
      },
      error : (err) => {
        console.error('Error al obtener las asignaciones.');
        this.requestCompleted.set(true);
      }
    })
  }

  // Cambiar ant/sig pagina
  changePage(page: number): void {
    if (this.pagination && page >= 1 && page <= this.pagination.totalPages) {
      this.getAssignments();
    }
  }

  // Calcular total de paginas
  private calculatePages(): void {
    if (!this.pagination) return;

    const currentPage = this.pagination.page;
    const totalPages = this.pagination.totalPages;

    // Mostrar hasta 3 páginas: actual -1, actual, actual +1 (dentro del rango válido)
    this.pages = Array.from(
      { length: Math.min(3, totalPages) },
      (_, i) => Math.max(1, currentPage - 1) + i
    );
  }

}