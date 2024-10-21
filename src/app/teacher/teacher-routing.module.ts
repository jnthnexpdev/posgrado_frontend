import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionsComponent } from './pages/revisions/revisions.component';
import { DetailsRevisionComponent } from './pages/details-revision/details-revision.component';

const routes: Routes = [
  {
    path : 'revisiones',
    component : RevisionsComponent
  },
  {
    path : 'detalle-revision/:id',
    component : DetailsRevisionComponent
  },
  {
      path : '',
      redirectTo : '/asesores/revisiones',
      pathMatch : 'full'
  },
  {
      path : '**',
      redirectTo : '/asesores/revisiones',
      pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
