import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RevisionsComponent } from './pages/revisions/revisions.component';
import { DetailsRevisionComponent } from './pages/details-revision/details-revision.component';
import { AdvisedStudentsComponent } from './pages/advised-students/advised-students.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path : 'revisiones',
    component : RevisionsComponent,
    canMatch : [authGuard]
  },
  {
    path : 'alumnos-asesorados',
    component : AdvisedStudentsComponent,
    canMatch : [authGuard]
  },
  {
    path : 'detalle-revision/:id',
    component : DetailsRevisionComponent,
    canMatch : [authGuard]
  },
  {
      path : '',
      redirectTo : '/asesor/alumnos-asesorados',
      pathMatch : 'full'
  },
  {
      path : '**',
      redirectTo : '/asesor/alumnos-asesorados',
      pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
