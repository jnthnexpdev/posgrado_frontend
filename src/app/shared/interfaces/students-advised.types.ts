// Interfaces relacionadas con la paginación
import { Pagination } from "./pagination.interface";

// Respuesta al obtener estudiantes asesorados
export interface StudentsResponse {
  success: boolean;  // Indica si la operación fue exitosa
  httpCode: number;  // Código de estado HTTP de la respuesta
  students: StudentsAdvised[];  // Lista de estudiantes asesorados
  pagination: Pagination;  // Información de la paginación
}

// Representa a un estudiante asesorado
export interface StudentsAdvised {
  _id: string;  // ID único del asesoramiento
  asesor: string;  // Nombre del asesor
  alumno: StudentAdvised;  // Información del estudiante
  periodo: string;  // Periodo del asesoramiento
  fechaAsignacion: string;  // Fecha de asignación
  notas: string;  // Notas relacionadas con el asesoramiento
  __v: number;  // Versión del documento (usada por Mongoose)
}

// Información básica de un estudiante asesorado
export interface StudentAdvised {
  _id: string;  // ID único del estudiante
  nombre: string;  // Nombre completo del estudiante
  numeroControl: string;  // Número de control del estudiante
  correo: string;  // Correo del estudiante
}

// Información para registrar un nuevo estudiante asesorado
export interface RegisterStudentAdvised {
  numeroControl: string;  // Número de control del estudiante
  periodo: string;  // Periodo en el que se registrará
  notas: string;  // Notas adicionales (opcional)
}

// Respuesta al registrar un nuevo estudiante asesorado
export interface RegisterStudentAdvisedResponse {
  success: boolean;  // Indica si la operación fue exitosa
  httpCode: number;  // Código de estado HTTP de la respuesta
  message: string;  // Mensaje descriptivo de la respuesta
}
