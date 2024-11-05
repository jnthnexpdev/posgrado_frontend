import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : 'acceso',
        title : 'Acceso',
        loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path : 'coordinacion',
        title : 'Coordinacion',
        loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path : 'asesor',
        title : 'Asesores',
        loadChildren : () => import('./teacher/teacher.module').then(m => m.TeacherModule)
    },
    {
        path : 'alumno',
        title : 'Alumnos',
        loadChildren : () => import('./students/students.module').then(m => m.StudentsModule)
    },
    {
        path : 'ajustes',
        title : 'Ajustes',
        loadComponent : () => import('./shared/pages/settings/settings.component').then(c => c.SettingsComponent)
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