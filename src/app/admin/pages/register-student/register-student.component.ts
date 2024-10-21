import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { UploadStudentsComponent } from '../../components/upload-students/upload-students.component';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [ ReactiveFormsModule, MatTooltip ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css'
})
export class RegisterStudentComponent implements OnInit{

  public showPassword = signal(false);
  public loginForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private dialog : MatDialog
  ){
    this.loginForm = this.formBuilder.group({
      correo : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  public togglePassword() : void{
    this.showPassword.set(!this.showPassword());
  }

  openDialogUpload() : void{
    this.dialog.open(UploadStudentsComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    })
  }

}