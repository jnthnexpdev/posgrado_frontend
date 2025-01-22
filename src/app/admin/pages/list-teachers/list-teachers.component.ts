import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from '../../../shared/interfaces/teachers.interface';
import { TeacherService } from '../../../shared/services/teachers/teacher.service';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-list-teachers',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './list-teachers.component.html',
  styleUrl: './list-teachers.component.css'
})
export class ListTeachersComponent implements OnInit{

  searchTerm: string = '';
  teachers : Teacher[] = [];
  pagination : Pagination | null = null;
  private teacherSubject = new Subject<String>();
  public requestCompleted = signal(false);

  constructor(
    private router : Router,
    private _teacherService : TeacherService
  ){}

  ngOnInit(): void {
    this.teacherSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 3 || term.length < 3),
      switchMap((term) => {
        const searchQuery = term.length < 3 ? '' : term;
        return this._teacherService.getTeachersInfo(searchQuery.toString());
      })
    )
    .subscribe({
      next: (response) => {
        this.teachers = response.teachers;
        this.pagination = response.pagination;
      },
      error : (err) => {
        console.error("Error al obtener la lista de asesores: ", err.error.message);
      },
    });

    this.getTeacherList();
  }

  redirecToRegister() : void{
    this.router.navigate(['/coordinacion/registrar-asesor']).then(() => {});
  }

  onSearch(term : string) : void{
    this.teacherSubject.next(term);
  }

  public getTeacherList() : void{
      this._teacherService.getTeachersInfo('').subscribe({
        next : (response) => {
          this.teachers = response.teachers;
          this.pagination = response.pagination;
          this.requestCompleted.set(true);
        },
        error : (err) => {
          console.error('Error al obtener la lista de asesores: ', err.error.message);
          this.requestCompleted.set(true);
        }
      });
  }

}
