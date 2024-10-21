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
        path : 'asesores',
        title : 'Asesores',
        loadChildren : () => import('./teacher/teacher.module').then(m => m.TeacherModule)
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