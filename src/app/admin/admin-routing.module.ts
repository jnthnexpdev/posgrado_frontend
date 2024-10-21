import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTeachersComponent } from './pages/list-teachers/list-teachers.component';
import { RegisterTeacherComponent } from './pages/register-teacher/register-teacher.component';
import { ListStudentsComponent } from './pages/list-students/list-students.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';

const routes: Routes = [
  {
    path : 'asesores',
    component : ListTeachersComponent
  },
  {
    path : 'registrar-asesor',
    component : RegisterTeacherComponent
  },
  {
    path : 'registrar-estudiantes',
    component : RegisterStudentComponent
  },
  {
    path : 'estudiantes',
    component : ListStudentsComponent
  },
  {
      path : '',
      redirectTo : '/coordinacion/asesores',
      pathMatch : 'full'
  },
  {
      path : '**',
      redirectTo : '/coordinacion/asesores',
      pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }