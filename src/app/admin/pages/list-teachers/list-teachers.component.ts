import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-teachers',
  standalone: true,
  imports: [],
  templateUrl: './list-teachers.component.html',
  styleUrl: './list-teachers.component.css'
})
export class ListTeachersComponent implements OnInit{

  constructor(
    private router : Router
  ){}

  ngOnInit(): void {
    
  }

  redirecToRegister() : void{
    this.router.navigate(['/coordinacion/registrar-asesor']).then(() => {});
  }


}
