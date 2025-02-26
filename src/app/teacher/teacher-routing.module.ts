import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAssignmentsComponent } from './pages/list-assignments/list-assignments.component';
import { DetailsAssignmentComponent } from './pages/details-assignment/details-assignment.component';
import { AdvisedStudentsComponent } from './pages/advised-students/advised-students.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path : 'revisiones',
    component : ListAssignmentsComponent,
    canMatch : [authGuard]
  },
  {
    path : 'alumnos-asesorados',
    component : AdvisedStudentsComponent,
    canMatch : [authGuard]
  },
  {
    path : 'detalle-revision/:id',
    component : DetailsAssignmentComponent,
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
