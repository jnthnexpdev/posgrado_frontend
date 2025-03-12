import { ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AlertService } from '../../../shared/services/alerts/alert.service';
import { Publication } from '../../../shared/interfaces/publications.interface';
import { PublicationsService } from '../../../shared/services/publications/publications.service';

@Component({
    selector: 'app-edit-publication',
    standalone: true,
    providers : [provideNativeDateAdapter()],
    imports: [ 
        NgClass, 
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-publication.component.html',
    styleUrl: './edit-publication.component.css'
})
export class EditPublicationComponent implements OnInit{

    publication !: Publication;
    public btnDisable = signal(false);
    public journalInvalid = signal(false);
    public urlInvalid = signal(false);
    public dateInvalid = signal(false);
    public editPublicationForm !: FormGroup;
    
    constructor(
        private formBuilder : FormBuilder,
        private dialog : Dialog,
        private _alertService : AlertService,
        private _publicationService : PublicationsService,
        private dateAdapter: DateAdapter<Date>,
    ){
        this.dateAdapter.setLocale('en-GB'); // dd/MM/yyyy
        this.dateAdapter.getDayOfWeekNames('narrow');

        this.editPublicationForm = this.formBuilder.group({
            revista : ['', [
                Validators.required,
                Validators.minLength(3), // Mínimo 5 caracteres
                Validators.maxLength(300), // Máximo 300 caracteres
            ]],
            url : ['', [
                Validators.required,
            ]],
            fechaPublicacion : ['', [
                Validators.required,
            ]],
        });
    }

    ngOnInit(): void{
        this.getStudentPublication();
    }  

    // Cerrar dialogo
    public closeDialog() : void{
        this.dialog.closeAll();
    }

    // Descativar boton para evitar multiples peticiones
    public disableBtn() : void{
        this.btnDisable.set(true);
        setTimeout(() => {
            this.btnDisable.set(false);
        }, 5000);
    }

      // Formatear la fecha a dd-mm-aaaa
    private getDate(): string {
        const date: Date = this.editPublicationForm.get('fechaPublicacion')?.value;
        if (date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses van de 0 a 11
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return '';
    }  

    // Obtener informacion de la publicacion del alumno
    getStudentPublication() : void{
        this._publicationService.getPublicationOfStudent().subscribe({
        next : (response) => {
            this.publication = response.publication;

            // Establecer informacion previamente guardada
            this.editPublicationForm.patchValue({
                revista : this.publication.revista,
                fechaPublicacion : this.publication.fechaPublicacion,
                url : this.publication.url,
            });
        }});
    }

    // Validar formulario
    public validateForm() : void{
        this.disableBtn();
        this.getDate();

        if(this.editPublicationForm.valid){
            const fechaFormateada = this.getDate();
            this.sendForm(fechaFormateada);
        }else{
            Object.keys(this.editPublicationForm.controls).forEach(key => {
                const control = this.editPublicationForm.get(key);
                
                if(control?.invalid){
                    switch(key){
                        case 'revista' : this.journalInvalid.set(true); break;
                        case 'url' : this.urlInvalid.set(true); break;
                        case 'fechaPublicacion' : this.dateInvalid.set(true); break;
                    }
                
                    setTimeout(() => {
                        this.journalInvalid.set(false);
                        this.urlInvalid.set(false);
                        this.dateInvalid.set(false);
                    }, 3000);
                }
            })
        }
    }
    // Enviar formulario a nodejs
    public sendForm(dateFormated: string): void {
        const formData = { 
          ...this.editPublicationForm.value,
          fechaPublicacion: dateFormated
        };

        this._publicationService.editPublication( this.publication._id , formData).subscribe({
            next : (response) => {
                if(response.success === true){
                    this._alertService.alertOk(response.message, 3500);
                    setTimeout(() => {
                    window.location.reload();
                    }, 3510);
                }
            },
            error : (err) => {
                this._alertService.alertError(err.error.message, 3500);
            }
        });
    }
}