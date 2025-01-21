import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../shared/services/students/student.service';
import { Student } from '../../../shared/interfaces/students.interface';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css'
})
export class ListStudentsComponent implements OnInit{

  searchTerm: string = '';
  students : Student[] = [];
  pagination : Pagination | null = null;
  private studentSubject = new Subject<String>();

  constructor(
    private router : Router,
    private _studentService : StudentService
  ){}

  ngOnInit(): void {
    this.studentSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 3 || term.length < 3),
      switchMap((term) => {
        const searchQuery = term.length < 3 ? '' : term;
        return this._studentService.getStudentsInfo(searchQuery.toString());
      })
    )
    .subscribe({
      next: (response) => {
        this.students = response.students;
        this.pagination = response.pagination;
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

  onSearch(term : string) : void{
    this.studentSubject.next(term);
  }

  private getStudentsList() : void{
    this._studentService.getStudentsInfo('').subscribe({
      next : (response) => {
        this.students = response.students;
        this.pagination = response.pagination;
        console.log('Alumnos:', this.students);
        console.log('Paginación:', this.pagination);
      },
      error : (err) => {
        console.error('Error al obtener la lista de alumnos: ', err.error.message);
      }
    });
}

}