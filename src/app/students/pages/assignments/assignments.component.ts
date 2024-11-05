import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{

  public expandDetails = signal(false);

  constructor(
    private _router : Router
  ){}

  ngOnInit(): void {
    
  }

  public expandCard() : void{
    this.expandDetails.set(!this.expandDetails());
  }

  viewDetails(id : number) : void{
    this._router.navigate([`/alumno/detalles-asignacion/${id}`]).then(() => {});
  }

}
