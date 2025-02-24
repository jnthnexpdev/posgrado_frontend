import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssingRevisionComponent } from '../../components/assing-revision/assing-revision.component';
import { Router } from '@angular/router';
import { AssignmentService } from '../../../shared/services/assignments/assignment.service';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { Assignment } from '../../../shared/interfaces/assignments.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-revisions',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './revisions.component.html',
  styleUrl: './revisions.component.css'
})
export class RevisionsComponent implements OnInit{

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
    private _dialog : MatDialog,
    private _router : Router,
    private _assignmentService : AssignmentService,
  ){}

  ngOnInit(): void {
    this.getAssignments();
  }

  openDialog() : void{
    this._dialog.open(AssingRevisionComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  viewDetails(id : number) : void{
    this._router.navigate([`/asesor/detalle-revision/${id}`]).then(() => {});
  }

  getAssignments() : void{
    this._assignmentService.getAssignmentsByPeriod('Enero - Junio 2025').subscribe({
      next  : (response) => {
        this.assignments = response.assignments;
        this.pagination = response.pagination;
        console.log(this.pagination);
      },
      error : (err) => {
        console.log('Error al obtener las asignaciones.');
      }
    })
  }

  changePage(page: number): void {
    if (this.pagination && page >= 1 && page <= this.pagination.totalPages) {
      this.getAssignments();
    }
  }

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
