import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { Period } from '../../../shared/interfaces/periods.interface';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { TesisService } from '../../../shared/services/tesis/tesis.service';
import { FormsModule } from '@angular/forms';
import { Tesis } from '../../../shared/interfaces/tesis.interface';

@Component({
    selector: 'app-list-tesis',
    standalone: true,
    imports: [ FormsModule ],
    templateUrl: './list-tesis.component.html',
    styleUrl: './list-tesis.component.css'
})
export class ListTesisComponent implements OnInit{

    public requestCompleted = signal(false);

    public period : string = '';
    public periods : Period[] = [];

    public tesis : Tesis[] = [];

    constructor(
        private dialog : MatDialog,
        private router : Router,
        private _tesisService : TesisService,
        private _periodService : PeriodService
    ){}

    ngOnInit(): void {
        this.getPeriodList();
        this.getAllTesis();
    }

    // Obtener el listado de periodos para filtrar a los alumnos
    private getPeriodList() : void{
      this._periodService.getPeriodsInfo('').subscribe({
        next : (response) => {
          this.periods = response.periods;
          if (this.periods.length > 0) {
            this.period = this.periods[this.periods.length - 1].periodo;
          }
        }
      });
    }

      // Obtener asignaciones
    getAllTesis() : void{
        this.requestCompleted.set(false);

        this._tesisService.allTesisOfPeriod(this.period).subscribe({
            next  : (response) => {
                this.tesis = response.tesis;

                console.log('Informacion tesis: ', this.tesis);

                setTimeout(() => {
                    this.requestCompleted.set(true);
                }, 2000);

            },
            error : (err) => {
                setTimeout(() => {
                    this.tesis = [];
                    this.requestCompleted.set(true);
                }, 2000);
            }
        });
    }

}
