import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAssignmentsComponent } from './pages/list-assignments/list-assignments.component';
import { DetailsAssignmentComponent } from './pages/details-assignment/details-assignment.component';
import { AdvisedStudentsComponent } from './pages/advised-students/advised-students.component';
import { authGuard } from '../auth/guards/auth.guard';
import { ListRevisionsComponent } from './pages/list-revisions/list-revisions.component';

const routes: Routes = [
  {
    path : 'asignaciones',
    component : ListAssignmentsComponent,
    canMatch : [authGuard]
  },
  {
    path : 'alumnos-asesorados',
    component : AdvisedStudentsComponent,
    canMatch : [authGuard]
  },
  {
    path : 'detalles-revision/:id',
    component : DetailsAssignmentComponent,
    canMatch : [authGuard]
  },
  {
    path : 'lista-entregas-alumnos/:id',
    component : ListRevisionsComponent,
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
