// Interfaces relacionadas con la paginación
import { Pagination } from "./pagination.interface";
import { ServerResponse } from "./server.interface";
import { Assignment } from "./assignments.interface";

export interface RegisterRevision extends Assignment{
    linkEntrega : string;
}

export interface GetRevisionResponse extends ServerResponse{
    revision : Revision;
}

export interface Revision {
    idAsignacion : string;
    nombreAsignacion : string;
    fechaAsignacion : string;
    alumno : string;
    nombreAlumno : string;
    tesis : string;
    linkEntrega: string;
    estatusEntrega : string;
    fechaEntrega : string;
    horaEntrega : string;
    calificacion : number;
    comentarios : [ Comment ]
}

export interface AllRevisionsOfAssignment extends ServerResponse{
    revisions : [Revision]
}

export interface Comment{
    nombreUsuario : string;
    comentario : string;
    fechaComentario : string;
}