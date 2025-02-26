import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { RegisterAdviseComponent } from '../../components/register-advise/register-advise.component';
import { StudentsAdvised } from '../../../shared/interfaces/students-advised.types';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { AdviseService } from '../../../shared/services/advise/advise.service';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { Period } from '../../../shared/interfaces/periods.interface';
import { AlertService } from '../../../shared/services/alerts/alert.service';

@Component({
  selector: 'app-mentored-students',
  standalone: true,
  imports: [ NgClass, FormsModule ],
  templateUrl: './advised-students.component.html',
  styleUrl: './advised-students.component.css'
})
export class AdvisedStudentsComponent implements OnInit{

  adviseds : StudentsAdvised [] = [];
  searchTerm: string = '';
  pagination: Pagination = {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  };
  pages : number[] = [];
  public period : string = '';
  periods : Period[] = [];
  private advisedsSubject = new Subject<String>();
  public requestCompleted = signal(false);

  constructor(
    private _dialog : MatDialog,
    private _adviseService : AdviseService,
    private _periodService : PeriodService,
    private _alertService : AlertService,
  ){}

  ngOnInit(): void {
    this.getPeriodList();

    this.advisedsSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 3 || term.length < 3),
      switchMap((term) => {
        const searchQuery = term.length < 3 ? '' : term;
        return this._adviseService.getStudentsAdvisedByTeacher(this.period, searchQuery.toString(), this.pagination?.page || 1 );
      })
    )
    .subscribe({
      next: (response) => {
        this.adviseds = response.students;
        this.pagination = response.pagination;
        this.calculatePages();
      },
      error : (err) => {
        console.error("Error al obtener la lista de asesorados: ", err.error.message);
      },
    });

    this.getStudentsAdvised();
  }

  public downloadAdvised(){
    this._adviseService.exportAdvised(this.period).subscribe((data : Blob) => {
      const url = window.URL.createObjectURL(data);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `asesoramiento_${this.period}.pdf`;
      anchor.target = '_blank';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    });

    this._alertService.alertLoading('Generando PDF y recargando pagina', 2500);

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  public addAdvisedStudent() : void{
    this._dialog.open(RegisterAdviseComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  public onSearch(term : string) : void{
    this.advisedsSubject.next(term);
  }

  private getPeriodList() : void{
    this._periodService.getPeriodsInfo('').subscribe({
      next : (response) => {
        this.periods = response.periods;
        if (this.periods.length > 0) {
          this.period = this.periods[this.periods.length - 1].periodo;
        }

        this.getStudentsAdvised();
      },
      error : (err) => {
        console.error('Error al obtener la lista de periodos: ', err.error.message);
      }
    });
  }

  public getStudentsAdvised(page: number = 1) : void{
    this._adviseService.getStudentsAdvisedByTeacher(this.period, '', page).subscribe({
      next : (response) => {
        this.adviseds = response.students;
        this.pagination = response.pagination;
        this.requestCompleted.set(true);
        this.calculatePages();
      },
      error : (err) => {
        console.error('Error al obtener la lista de asesorados: ', err.error.message);
        this.requestCompleted.set(true);
      }
    });
  }

  changePage(page: number): void {
    if (this.pagination && page >= 1 && page <= this.pagination.totalPages) {
      this.getStudentsAdvised(page);
    }
  }

  private calculatePages(): void {
    if (!this.pagination) return;

    const currentPage = this.pagination.page;
    const totalPages = this.pagination.totalPages;

    // Mostrar hasta 3 páginas: actual -1, actual, actual +1 (dentro del rango válido)
    this.pages = Array.from(
      { length: Math.min(3, totalPages) },
      (_, i) => Math.max(1, currentPage - 1) + i
    );
  }

}