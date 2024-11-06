import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMentoredStudentComponent } from '../../components/add-mentored-student/add-mentored-student.component';

@Component({
  selector: 'app-mentored-students',
  standalone: true,
  imports: [],
  templateUrl: './mentored-students.component.html',
  styleUrl: './mentored-students.component.css'
})
export class MentoredStudentsComponent implements OnInit{

  constructor(
    private _dialog : MatDialog
  ){}

  ngOnInit(): void {
    
  }

  addMentoredStudent() : void{
    this._dialog.open(AddMentoredStudentComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    })
  }

}
