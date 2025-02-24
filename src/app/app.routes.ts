import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    {
        path : 'acceso',
        title : 'Acceso',
        loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path : 'coordinacion',
        title : 'Coordinacion',
        loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule),
        canMatch : [authGuard]
    },
    {
        path : 'asesor',
        title : 'Asesores',
        loadChildren : () => import('./teacher/teacher.module').then(m => m.TeacherModule),
        canMatch : [authGuard]
    },
    {
        path : 'alumno',
        title : 'Alumnos',
        loadChildren : () => import('./students/students.module').then(m => m.StudentsModule),
        canMatch : [authGuard]
    },
    {
        path : 'perfil',
        title : 'Perfil',
        loadComponent : () => import('./shared/pages/settings/settings.component').then(c => c.SettingsComponent),
        canMatch : [authGuard]
    },
    {
        path : '',
        redirectTo : '/acceso',
        pathMatch : 'full'
    },
    {
        path : '**',
        redirectTo : '/acceso',
        pathMatch : 'full'
    }
];