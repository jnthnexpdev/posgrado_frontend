import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from '../../../shared/interfaces/teachers.interface';
import { TeacherService } from '../../../shared/services/teachers/teacher.service';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-teachers',
  standalone: true,
  imports: [ NgClass, FormsModule ],
  templateUrl: './list-teachers.component.html',
  styleUrl: './list-teachers.component.css'
})
export class ListTeachersComponent implements OnInit{

  searchTerm: string = '';
  teachers : Teacher[] = [];
  pagination: Pagination = {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  };
  pages : number[] = [];
  private teacherSubject = new Subject<String>();
  public requestCompleted = signal(false);

  constructor(
    private router : Router,
    private _teacherService : TeacherService
  ){}

  ngOnInit(): void {
    this.teacherSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 3 || term.length < 3),
      switchMap((term) => {
        const searchQuery = term.length < 3 ? '' : term;
        return this._teacherService.getTeachersInfo(searchQuery.toString(), this.pagination?.page || 1);
      })
    )
    .subscribe({
      next: (response) => {
        this.teachers = response.teachers;
        this.pagination = response.pagination;
        this.calculatePages();
        console.log('Paginado: ', this.pagination);
      },
      error : (err) => {
        console.error("Error al obtener la lista de asesores: ", err.error.message);
      },
    });

    this.getTeacherList();
  }

  redirecToRegister() : void{
    this.router.navigate(['/coordinacion/registrar-asesor']).then(() => {});
  }

  onSearch(term : string) : void{
    this.teacherSubject.next(term);
  }

  public getTeacherList(page: number = 1) : void{
      this._teacherService.getTeachersInfo('', page).subscribe({
        next : (response) => {
          this.teachers = response.teachers;
          this.pagination = response.pagination;
          this.requestCompleted.set(true);
          this.calculatePages();
          console.log('Paginado: ', this.pagination);
        },
        error : (err) => {
          console.error('Error al obtener la lista de asesores: ', err.error.message);
          this.requestCompleted.set(true);
        }
      });
  }

  changePage(page: number): void {
    if (this.pagination && page >= 1 && page <= this.pagination.totalPages) {
      this.getTeacherList(page);
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