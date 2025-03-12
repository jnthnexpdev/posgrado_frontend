import { ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { AlertService } from '../../../shared/services/alerts/alert.service';
import { Publication } from '../../../shared/interfaces/publications.interface';
import { PublicationsService } from '../../../shared/services/publications/publications.service';

@Component({
    selector: 'app-register-publication',
    standalone: true,
    providers : [provideNativeDateAdapter()],
    imports: [
        NgClass, 
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register-publication.component.html',
    styleUrl: './register-publication.component.css'
})
export class RegisterPublicationComponent implements OnInit{

    publication !: Publication;
    public btnDisable = signal(false);
    public journalInvalid = signal(false);
    public urlInvalid = signal(false);
    public dateInvalid = signal(false);
    public registerPublicationForm !: FormGroup;
    
    constructor(
        private formBuilder : FormBuilder,
        private dialog : Dialog,
        private _alertService : AlertService,
        private _publicationService : PublicationsService,
        private dateAdapter: DateAdapter<Date>,
    ){
        this.dateAdapter.setLocale('en-GB'); // dd/MM/yyyy
        this.dateAdapter.getDayOfWeekNames('narrow');

        this.registerPublicationForm = this.formBuilder.group({
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
    }  

    // Cerrar dialogo
    public closeDialog() : void{
        this.dialog.closeAll();
    }

    // Desactivar boton para evitar multiples peticiones
    public disableBtn() : void{
        this.btnDisable.set(true);
        setTimeout(() => {
            this.btnDisable.set(false);
        }, 5000);
    }

      // Formatear la fecha a dd-mm-aaaa
    private getDate(): string {
        const date: Date = this.registerPublicationForm.get('fechaPublicacion')?.value;
        if (date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses van de 0 a 11
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return '';
    }

    // Validar formulario
    public validateForm() : void{
        this.disableBtn();
        this.getDate();

        if(this.registerPublicationForm.valid){
            const fechaFormateada = this.getDate();
            this.sendForm(fechaFormateada);
        }else{
            Object.keys(this.registerPublicationForm.controls).forEach(key => {
                const control = this.registerPublicationForm.get(key);
                
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
          ...this.registerPublicationForm.value,
          fechaPublicacion: dateFormated
        };

        this._publicationService.registerPublication(formData).subscribe({
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