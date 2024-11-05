import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { AssignmentDetailsComponent } from './pages/assignment-details/assignment-details.component';

const routes: Routes = [
  {
    path : 'asignaciones',
    component : AssignmentsComponent
  },
  {
    path : 'detalles-asignacion/:id',
    component : AssignmentDetailsComponent
  },
  {
      path : '',
      redirectTo : '/alumno/asignaciones',
      pathMatch : 'full'
  },
  {
      path : '**',
      redirectTo : '/alumno/asignaciones',
      pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
