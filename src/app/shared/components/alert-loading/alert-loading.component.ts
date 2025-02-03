import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-loading',
  standalone: true,
  imports: [],
  templateUrl: './alert-loading.component.html',
  styleUrl: './alert-loading.component.css'
})
export class AlertLoadingComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : { message : string }
  ){}

  ngOnInit(): void {
    
  }

}