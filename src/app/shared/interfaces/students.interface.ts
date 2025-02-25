import { Pagination } from "./pagination.interface";
import { ServerResponse } from "./server.interface";

// Interfaz base para estudiantes
export interface BaseStudent {
  _id: string;
  nombre: string;
  numeroControl: string;
  correo: string;
  tipoCuenta: string;
  estatusCuenta: string;
  fechaRegistro: string;
  horaRegistro: string;
  sesion: StudentSession;
  __v: number;
}

// Estudiantes por periodo
export interface StudentsByPeriodResponse extends ServerResponse{
  period: {
    students: StudentInPeriod[];
    pagination: Pagination;
  };
}

// Informacion estudiante por periodo
export interface StudentInPeriod {
  _id: string;
  nombre: string;
  numeroControl: string;
  correo: string;
  estatusCuenta: string;
  fechaRegistro: string;
}

// Interfaz para la sesión del estudiante
export interface StudentSession {
  ultimaSesion: string;
  codigoAcceso: string;
}

// Interfaz para un estudiante en la lista
export interface Student extends BaseStudent {}

// Interfaz para el registro de un estudiante
export interface RegisterStudent {
  nombre: string;
  correo: string;
  numeroControl: string;
  password: string;
}

// Interfaz para la cuenta del estudiante después del registro
export interface StudentAccount extends BaseStudent {
  password: string; // Incluye el hash de la contraseña en este contexto
}

// Respuesta al obtener la lista de estudiantes
export interface StudentsResponse extends ServerResponse{
  students: Student[]; // Lista de estudiantes
  pagination: Pagination; // Información de paginación
}

// Respuesta al registrar un nuevo estudiante
export interface RegisterStudentsResponse extends ServerResponse{
  studentId: string; // Información detallada del estudiante registrado
}