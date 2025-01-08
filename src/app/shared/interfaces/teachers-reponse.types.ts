import { Pagination } from "./pagination.interface";

export interface TeacherSession {
  ultimaSesion: string;
  codigoAcceso: string;
}
  
export interface Teacher {
  sesion: TeacherSession;
  _id: string;
  nombre: string;
  correo: string;
  tipoCuenta: string;
  estatusCuenta: string;
  fechaRegistro: string;
  horaRegistro: string;
  __v: number;
}

export interface TeachersResponse {
  success: boolean;
  httpCode: number;
  teachers: Teacher[];
  pagination : Pagination;
}