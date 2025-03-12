import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


import { PublicationsService } from '../../../shared/services/publications/publications.service';
import { AdviseService } from '../../../shared/services/advise/advise.service';
import { TesisService } from '../../../shared/services/tesis/tesis.service';
import { EditTesisComponent } from '../edit-tesis/edit-tesis.component';
import { RegisterTesisComponent } from '../register-tesis/register-tesis.component';
import { Tesis } from '../../../shared/interfaces/tesis.interface';
import { Publication } from '../../../shared/interfaces/publications.interface';

@Component({
    selector: 'app-student-profile',
    standalone: true,
    imports: [ MatDividerModule, MatListModule ],
    templateUrl: './student-profile.component.html',
    styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit{

    tesis !: Tesis;
    publication !: Publication;

    // Informacion del asesor y fecha de asignacion
    advisorName : string = '';
    advisorEmail : string = '';
    dateAssignment : string = '';

    // Alumno sin asesor
    public withoutAdvisor = signal(false);
    // Tesis y publicacion alumno
    public studentWithTesis = signal(false);
    public studentWithPublication= signal(false);
    
    constructor(
        private dialog : MatDialog,
        private _publicationService : PublicationsService,
        private _tesisService : TesisService,
        private _adviseService : AdviseService,
    ){}

    ngOnInit(): void {
        this.getAdvisorInfo();
        this.getStudentPublication();
        this.getStudentTesis();
    }

    // Abrir dialogo para registrar una tesis
    openDialogTesis() : void{
        this.dialog.open(RegisterTesisComponent, {
            minWidth: '200px',
            width : '350px',
            maxWidth: '350px'
        });
    }

    // Abrir dialogo para registrar una tesis
    openDialogEditTesis() : void{
        this.dialog.open(EditTesisComponent, {
            minWidth: '200px',
            width : '350px',
            maxWidth: '350px'
        });
    }

    // Obtener informacion de la tesis del alumno
    getStudentTesis() : void{
        this._tesisService.getTesisByStudent().subscribe({
        next : (response) => {
            this.tesis = response.tesis;
            this.studentWithTesis.set(true);
        }, 
        error : (err) => {
            this.studentWithTesis.set(false);
        }
        })
    }

    // Obtener informacion de la publicacion del alumno
    getStudentPublication() : void{
        this._publicationService.getPublicationOfStudent().subscribe({
        next : (response) => {
            this.publication = response.publication;
            this.studentWithPublication.set(true);
        }, 
        error : (err) => {
            this.studentWithPublication.set(false);
        }
        })
    }

    // Obtener la informacion del asesor de un alumno
    getAdvisorInfo() : void{
        this._adviseService.getAdvisorInfo().subscribe({
        next : (response) => {
            this.advisorName = response.assignment.nombre;
            this.advisorEmail = response.assignment.correo;
            this.dateAssignment = response.assignment.fechaAsignacion;
        },
        error : (err) => {
            this.withoutAdvisor.set(true);
        }
        })
    }

}
