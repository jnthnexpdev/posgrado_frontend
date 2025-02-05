import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

import { StudentService } from '../../../shared/services/students/student.service';
import { Student } from '../../../shared/interfaces/students.interface';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { AlertService } from '../../../shared/services/alerts/alert.service';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [ NgClass, FormsModule ],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css'
})
export class ListStudentsComponent implements OnInit{

  searchTerm: string = '';
  students : Student[] = [];
  pagination: Pagination = {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  };
  pages : number[] = [];
  private studentSubject = new Subject<String>();
  public requestCompleted = signal(false);

  constructor(
    private router : Router,
    private _studentService : StudentService,
    private _alertService : AlertService
  ){}

  ngOnInit(): void {
    this.studentSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 3 || term.length < 3),
      switchMap((term) => {
        const searchQuery = term.length < 3 ? '' : term;
        return this._studentService.getStudentsInfo(searchQuery.toString(), this.pagination?.page || 1);
      })
    )
    .subscribe({
      next: (response) => {
        this.students = response.students;
        this.pagination = response.pagination;
        this.calculatePages();
      },
      error : (err) => {
        console.error("Error al obtener la lista de estudiantes: ", err.error.message);
      },
    });

    this.getStudentsList();
  }

  redirecToRegister() : void{
    this.router.navigate(['/coordinacion/registrar-estudiantes']).then(() => {});
  }

  downloadStudents() : void{
    this._studentService.exportStudents().subscribe((data : Blob) => {
      const url = window.URL.createObjectURL(data);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'alumnos.pdf';
      anchor.target = '_blank';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    });

    this._alertService.alertLoading('Generando PDF y recargando pagina', 2500);

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  deleteStudent(id : string) : void{
    this._alertService.alertConfirmation('Deseas eliminar este alumno?', 'Eliminar', 20000);
  }

  onSearch(term : string) : void{
    this.studentSubject.next(term);
  }

  private getStudentsList(page: number = 1) : void{
    this._studentService.getStudentsInfo('', page).subscribe({
      next : (response) => {
        this.students = response.students;
        this.pagination = response.pagination;
        this.requestCompleted.set(true);
        this.calculatePages();
      },
      error : (err) => {
        console.error('Error al obtener la lista de alumnos: ', err.error.message);
        this.requestCompleted.set(true);
      }
    });
  }

  changePage(page: number): void {
    if (this.pagination && page >= 1 && page <= this.pagination.totalPages) {
      this.getStudentsList(page);
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