import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-ok',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './alert-ok.component.html',
  styleUrl: './alert-ok.component.css'
})
export class AlertOkComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : { message : string }
  ){}

  ngOnInit(): void {
    
  }

}
