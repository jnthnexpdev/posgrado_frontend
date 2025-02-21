import { ServerResponse } from './server.interface';

export interface TesisResponseServer extends ServerResponse{
    tesis : Tesis;
}

export interface Tesis {
    titulo: string;
    alumno: string;
    asesor: string;
    estatus: string;
    aprobacion: { nombre: string | null; fechaAprobacion: string | null };
    url: string | null;
    fechaInicio: string;
    fechaEntrega: string | null;
    areaConocimiento: string;
    resumen: string | null;
    _id : string;
}

export type TesisRegister = Pick<Tesis, "titulo" | "areaConocimiento">
export type EditTesis = Pick<Tesis, "titulo" | "areaConocimiento" | "resumen" | "url">