import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path : 'iniciar-sesion',
    component : LoginComponent
  },
  {
      path : '',
      redirectTo : '/acceso/iniciar-sesion',
      pathMatch : 'full'
  },
  {
      path : '**',
      redirectTo : '/acceso/iniciar-sesion',
      pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
