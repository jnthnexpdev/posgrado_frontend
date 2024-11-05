import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './pages/assignments/assignments.component';

const routes: Routes = [
  {
    path : 'asignaciones',
    component : AssignmentsComponent
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
