import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination, Teacher } from '../../../shared/interfaces/teachers-reponse.types';
import { TeacherService } from '../../../shared/services/teachers/teacher.service';

@Component({
  selector: 'app-list-teachers',
  standalone: true,
  imports: [],
  templateUrl: './list-teachers.component.html',
  styleUrl: './list-teachers.component.css'
})
export class ListTeachersComponent implements OnInit{

  teachers : Teacher[] = [];
  pagination : Pagination | null = null;

  constructor(
    private router : Router,
    private _teacherService : TeacherService
  ){}

  ngOnInit(): void {
    this.getTeacherList();
  }

  redirecToRegister() : void{
    this.router.navigate(['/coordinacion/registrar-asesor']).then(() => {});
  }

  private getTeacherList() : void{
      this._teacherService.getTeachersInfo().subscribe({
        next : (response) => {
          this.teachers = response.teachers;
          this.pagination = response.pagination;
          console.log('Asesores:', this.teachers);
          console.log('Paginación:', this.pagination);
        },
        error : (err) => {
          console.error('Error al obtener la lista de asesores: ', err.error.message);
        }
      });
  }

}
