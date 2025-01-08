import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../shared/services/students/student.service';
import { Student } from '../../../shared/interfaces/students-response.types';
import { Pagination } from '../../../shared/interfaces/pagination.interface';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css'
})
export class ListStudentsComponent implements OnInit{

  students : Student[] = [];
  pagination : Pagination | null = null;

  constructor(
    private router : Router,
    private _studentService : StudentService
  ){}

  ngOnInit(): void {
    this.getStudentsList();
  }

  redirecToRegister() : void{
    this.router.navigate(['/coordinacion/registrar-estudiantes']).then(() => {});
  }

  private getStudentsList() : void{
    this._studentService.getStudentsInfo().subscribe({
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