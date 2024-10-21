import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssingRevisionComponent } from '../../components/assing-revision/assing-revision.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revisions',
  standalone: true,
  imports: [],
  templateUrl: './revisions.component.html',
  styleUrl: './revisions.component.css'
})
export class RevisionsComponent implements OnInit{

  constructor(
    private _dialog : MatDialog,
    private _router : Router
  ){}

  ngOnInit(): void {
    
  }

  openDialog() : void{
    this._dialog.open(AssingRevisionComponent, {
      minWidth: '200px',
      width : '350px',
      maxWidth: '350px'
    });
  }

  viewDetails(id : number) : void{
    this._router.navigate([`/asesores/detalle-revision/${id}`]).then(() => {});
  }

}
