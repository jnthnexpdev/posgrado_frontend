import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-error',
  standalone: true,
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.css'
})
export class AlertErrorComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : { message : string }
  ){}

  ngOnInit(): void {
    
  }

}