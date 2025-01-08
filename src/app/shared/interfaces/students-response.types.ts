export interface Pagination {
    total : number;
    page : number;
    pageSize : number;
    totalPages : number;
}

export interface StudentSession {
    ultimaSesion: string;
    codigoAcceso: string;
}
  
export interface Student {
  sesion: StudentSession;
  _id: string;
  nombre: string;
  correo: string;
  tipoCuenta: string;
  estatusCuenta: string;
  fechaRegistro: string;
  horaRegistro: string;
  __v: number;
}

export interface StudentsResponse {
  success: boolean;
  httpCode: number;
  students: Student[];
  pagination : Pagination;
}