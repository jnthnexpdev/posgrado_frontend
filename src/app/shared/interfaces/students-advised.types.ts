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

export interface StudentAdvised {
  _id: string;
  nombre: string;
  correo: string;
}