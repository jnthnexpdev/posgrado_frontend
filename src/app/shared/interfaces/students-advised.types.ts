import { Pagination } from "./pagination.interface";

export interface StudentsResponse {
  success: boolean;
  httpCode: number;
  students: StudentsAdvised[];
  pagination : Pagination;
}

export interface StudentsAdvised {
  _id: string;
  asesor: string;
  alumno: StudentAdvised;
  periodo: string;
  fechaAsignacion: string;
  notas: string;
  __v: number;
}

export interface RegisterStudentAdvised {
  numeroControl: string;
  periodo: string;
  notas: string;
}

// Respuesta al registrar un nuevo estudiante
export interface RegisterStudentAdvisedResponse {
  success: boolean;
  httpCode: number;
  message: string;
}

export interface StudentAdvised {
  _id: string;
  nombre: string;
  numeroControl: string;
  correo: string;
}