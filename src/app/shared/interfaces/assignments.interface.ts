// Interfaces relacionadas con la paginación
import { Pagination } from "./pagination.interface";
import { ServerResponse } from "./server.interface";

export interface AssignmentsResponse extends ServerResponse{
    assignments : [ Assignment ];
    pagination : Pagination
}

export interface AssignmentsOfStudentResponse extends ServerResponse{
    assignments : [ Assignment ];
}

export interface AssignmentResponse extends ServerResponse{
    assignment : Assignment;
}

export interface Assignment {
    asesor : [ AsesorAssignment ];
    nombre : string;
    descripcion : string;
    fechaAsignacion : string;
    fechaLimite : string;
    periodo : string;
    alumnos : [ AlumnosAssignment ];
    _id : string;
}

export interface AsesorAssignment {
    idAsesor : string;
    nombreAsesor : string;
}

export interface AlumnosAssignment {
    idAlumno : string;
    nombreAlumno : string;
    _id : string;
}

export type NewAssignment = Pick< Assignment, "nombre" | "descripcion" | "fechaLimite" | "periodo" >;