// Importación de la interfaz de paginación
import { Pagination } from "./pagination.interface";
import { ServerResponse } from "./server.interface";

// Información sobre la sesión del profesor
export interface TeacherSession {
  ultimaSesion: string; // Fecha y hora de la última sesión del profesor
  codigoAcceso: string; // Código de acceso único para la sesión
}

// Representación de un profesor en el sistema
export interface Teacher {
  sesion: TeacherSession; // Información de la sesión del profesor
  _id: string;            // ID único del profesor
  nombre: string;         // Nombre completo del profesor
  correo: string;         // Correo electrónico del profesor
  tipoCuenta: string;     // Tipo de cuenta (e.g., "Profesor", "Administrador")
  estatusCuenta: string;  // Estatus de la cuenta (e.g., "Activa", "Inactiva")
  fechaRegistro: string;  // Fecha en la que se registró la cuenta
  horaRegistro: string;   // Hora en la que se registró la cuenta
  __v: number;            // Versión del documento (usada por Mongoose)
}

// Interfaz para el registro de un asesor
export interface RegisterTeacher{
  nombre: string;
  correo: string;
  password: string;
}

// Respuesta al obtener la lista de profesores
export interface TeachersRegisterResponse extends ServerResponse{
  success: boolean;   // Indica si la operación fue exitosa
  httpCode: number;   // Código de estado HTTP de la respuesta
  teachers: Teacher[]; // Lista de profesores
  pagination: Pagination; // Información sobre la paginación
}