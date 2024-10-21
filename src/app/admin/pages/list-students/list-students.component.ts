import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.css'
})
export class ListStudentsComponent {

  constructor(
    private router : Router
  ){}

  redirecToRegister() : void{
    this.router.navigate(['/coordinacion/registrar-estudiantes']).then(() => {});
  }

}