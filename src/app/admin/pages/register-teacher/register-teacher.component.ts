import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-register-teacher',
  standalone: true,
  imports: [ ReactiveFormsModule, MatTooltip ],
  templateUrl: './register-teacher.component.html',
  styleUrl: './register-teacher.component.css'
})
export class RegisterTeacherComponent implements OnInit{

  public showPassword = signal(false);
  public loginForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
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
    console.log(this.showPassword);
  }

}