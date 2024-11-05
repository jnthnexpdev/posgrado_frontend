import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit{

  public expandDetails = signal(false);

  ngOnInit(): void {
    
  }

  public expandCard() : void{
    this.expandDetails.set(!this.expandDetails());
    console.log(this.expandDetails())
  }

}
