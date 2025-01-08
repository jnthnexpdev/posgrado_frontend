import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMentoredStudentComponent } from '../../components/add-mentored-student/add-mentored-student.component';
import { StudentsAdvised } from '../../../shared/interfaces/students-advised.types';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { AdviseService } from '../../../shared/services/advise/advise.service';

@Component({
  selector: 'app-mentored-students',
  standalone: true,
  imports: [],
  templateUrl: './advised-students.component.html',
  styleUrl: './advised-students.component.css'
})
export class AdvisedStudentsComponent implements OnInit{

  adviseds : StudentsAdvised [] = [];
  pagination : Pagination | null = null;

  constructor(
    private _dialog : MatDialog,
    private _adviseService : AdviseService
  ){}

  ngOnInit(): void {
    this.getStudentsAdvised();
  }

  addAdvisedStudent() : void{
    this._dialog.open(AddMentoredStudentComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    })
  }

  private getStudentsAdvised() : void{
    this._adviseService.getStudentsAdvisedByTeacher().subscribe({
      next : (response) => {
        this.adviseds = response.students;
        this.pagination = response.pagination;
        console.log('Alumnos:', this.adviseds);
        console.log('Paginación:', this.pagination);
      },
      error : (err) => {
        console.error('Error al obtener la lista de alumnos: ', err.error.message);
      }
    });
}

}
