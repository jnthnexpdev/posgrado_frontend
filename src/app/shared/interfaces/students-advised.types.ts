// Interfaces relacionadas con la paginación
import { Pagination } from "./pagination.interface";
import { ServerResponse } from "./server.interface";

// Respuesta al obtener estudiantes asesorados
export interface StudentsResponse extends ServerResponse{
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

export interface AdvisorInfo extends ServerResponse{
  assignment : AssignmentInfo
}

export interface AssignmentInfo {
  nombre : string;
  correo : string;
  fechaAsignacion : string;
}

export interface AdvisedCount extends ServerResponse{
  counter : number;
}