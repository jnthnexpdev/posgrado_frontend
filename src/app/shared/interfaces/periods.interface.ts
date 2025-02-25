// Interfaces relacionadas con la paginación
import { Pagination } from "./pagination.interface";
import { ServerResponse } from "./server.interface";

export interface RegisterPeriod{
    periodo: string;
}

export interface AllPeriods extends ServerResponse{
    periods: [Period] // Periodos
    pagination : Pagination
}

export interface Period{
    _id: string;  // ID único del periodo
    periodo: string;  // Periodo
    fechaRegistro: string;  // Fecha de asignación
    horaRegistro: string;  // Hora de asignación
    alumnos: [AlumnoPeriodo];  // Alumnos del periodo
    __v: number;  // Versión del documento (usada por Mongoose)
}

export interface AlumnoPeriodo{
    _id: string;  // ID único del alumno
}