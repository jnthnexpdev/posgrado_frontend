import { Component, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { PeriodService } from '../../../shared/services/periods/period.service';
import { RegisterPeriodComponent } from '../../components/register-period/register-period.component';
import { AlertService } from '../../../shared/services/alerts/alert.service';
import { Period } from '../../../shared/interfaces/periods.interface';
import { Pagination } from '../../../shared/interfaces/pagination.interface';

@Component({
  selector: 'app-list-periods',
  standalone: true,
  imports: [ NgClass, MatTooltip ],
  templateUrl: './list-periods.component.html',
  styleUrl: './list-periods.component.css'
})
export class ListPeriodsComponent implements OnInit{

  searchTerm: string = '';
  periods : Period[] = [];
  pagination: Pagination = {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  };
  pages : number[] = [];
  private periodSubject = new Subject<String>();
  public requestCompleted = signal(false);

  constructor(
    private dialog : Dialog,
    private alertService : AlertService,
    private _periodService : PeriodService
  ){}

  ngOnInit(): void {
    this.periodSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 3 || term.length < 3),
      switchMap((term) => {
        const searchQuery = term.length < 3 ? '' : term;
        return this._periodService.getPeriodsInfo(searchQuery.toString(), this.pagination?.page || 1);
      })
    )
    .subscribe({
      next: (response) => {
        this.periods = response.periods;
        this.pagination = response.pagination;
        this.calculatePages();
      },
      error : (err) => {
        console.error("Error al obtener la lista de periodos: ", err.error.message);
      },
    });

    this.getPeriodList();
  }

  public openDialogRegister() : void{
    this.dialog.open(RegisterPeriodComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    })
  }

  onSearch(term : string) : void{
    this.periodSubject.next(term);
  }

  downloadPeriods() : void{
    this._periodService.exportPeriods().subscribe((data : Blob) => {
      const url = window.URL.createObjectURL(data);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'periodos.pdf';
      anchor.target = '_blank';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    });

    this.alertService.alertLoading('Generando PDF y recargando pagina', 2500);

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  private getPeriodList(page: number = 1) : void{
    this._periodService.getPeriodsInfo('', page).subscribe({
      next : (response) => {
        this.periods = response.periods;
        this.pagination = response.pagination;
        this.requestCompleted.set(true);
        this.calculatePages();
      },
      error : (err) => {
        console.error('Error al obtener la lista de periodos: ', err.error.message);
        this.requestCompleted.set(true);
      }
    });
  }

  changePage(page: number): void {
    if (this.pagination && page >= 1 && page <= this.pagination.totalPages) {
      this.getPeriodList(page);
    }
  }

  private calculatePages(): void {
    if (!this.pagination) return;

    const currentPage = this.pagination.page;
    const totalPages = this.pagination.totalPages;

    this.pages = Array.from(
      { length: Math.min(3, totalPages) },
      (_, i) => Math.max(1, currentPage - 1) + i
    );
  }

  public deletePeriod(id : string) : void{
    this._periodService.deletePeriodById(id).subscribe({
      next : (response) => {
        this.alertService.alertOk(response.message, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3001);
      },
      error : (err) => {
        this.alertService.alertError(err.error.message, 3000);
      },
    })
  }

}