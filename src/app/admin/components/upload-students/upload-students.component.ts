import { Dialog } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-upload-students',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './upload-students.component.html',
  styleUrl: './upload-students.component.css'
})
export class UploadStudentsComponent implements OnInit{
  public fileInvalid = signal(false);
  public fileSelected : File | null = null;

  constructor(
    private dialog : Dialog
  ){}


  ngOnInit(): void {
    
  }

  onFileSelected(event: any): void {
    this.fileSelected = event.target.files[0] as File;
  }

  public closeDialog() : void{
    this.dialog.closeAll();
  }

}