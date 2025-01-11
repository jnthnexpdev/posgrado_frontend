import { Component, OnInit, signal } from '@angular/core';
import { AlertService } from '../../../shared/services/alerts/alert.service';

@Component({
  selector: 'app-add-mentored-student',
  standalone: true,
  imports: [],
  templateUrl: './add-mentored-student.component.html',
  styleUrl: './add-mentored-student.component.css'
})
export class AddMentoredStudentComponent implements OnInit{

  public btnDisable = signal(false);
  public controlNumberInvalid = signal(false);
  public periodInvalid = signal(false);

  constructor(
    private alertService : AlertService
  ){}

  ngOnInit(): void {
    
  }

  public disableBtn() : void{
    this.btnDisable.set(true);
    setTimeout(() => {
      this.btnDisable.set(false);
    }, 3000);
  }


}
