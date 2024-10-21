import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './alert-confirmation.component.html',
  styleUrl: './alert-confirmation.component.css'
})
export class AlertConfirmationComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : { message : string }
  ){}

  ngOnInit(): void {
    
  }

}