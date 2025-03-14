import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';


import { Period } from '../../../shared/interfaces/periods.interface';
import { PeriodService } from '../../../shared/services/periods/period.service';
import { TesisService } from '../../../shared/services/tesis/tesis.service';
import { Tesis } from '../../../shared/interfaces/tesis.interface';
import { AlertService } from '../../../shared/services/alerts/alert.service';

@Component({
    selector: 'app-list-tesis',
    standalone: true,
    imports: [ FormsModule, MatTooltip ],
    templateUrl: './list-tesis.component.html',
    styleUrl: './list-tesis.component.css'
})
export class ListTesisComponent implements OnInit{

    public requestCompleted = signal(false);

    public period : string = '';
    public periods : Period[] = [];

    public tesis : Tesis[] = [];

    constructor(
        private _tesisService : TesisService,
        private _periodService : PeriodService,
        private _alertService : AlertService
    ){}

    ngOnInit(): void {
        this.getPeriodList();
        this.getAllTesis();
    }

    // Obtener el listado de periodos para filtrar a los alumnos
    private getPeriodList() : void{
        this.tesis = [];
        setTimeout(() => {
            this.requestCompleted.set(false);
        }, 2000);

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
        this._tesisService.allTesisOfPeriod(this.period).subscribe({
            next  : (response) => {
                this.tesis = response.tesis;

                setTimeout(() => {
                    this.requestCompleted.set(true);
                }, 2000);
                console.clear();
            },
            error : (err) => {
                this.tesis = [];
                setTimeout(() => {
                    this.requestCompleted.set(true);
                }, 2000);
                console.clear();
            }
        });
    }

    // Aprobar tesis
    approveTesis(idTesis : string) : void{
        this._tesisService.approveTesis(idTesis).subscribe({
            next : (response) => {
                this._alertService.alertOk(response.message, 3500);

                setTimeout(() => {
                    window.location.reload();
                }, 3501);
            },
            error : (err) => {
                this._alertService.alertError(err.error.message, 3500);
            }
        });
    }

    // Rechazar tesis
    rejectTesis(idTesis : string) : void{
        this._tesisService.rejectTesis(idTesis).subscribe({
            next : (response) => {
                this._alertService.alertOk(response.message, 3500);

                setTimeout(() => {
                    window.location.reload();
                }, 3501);
            },
            error : (err) => {
                this._alertService.alertError(err.error.message, 3500);
            }
        });
    }

}