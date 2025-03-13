import { ServerResponse } from './server.interface';

export interface TesisResponseServer extends ServerResponse{
    tesis : Tesis;
}

export interface AllTesisOfPeriod extends ServerResponse{
    tesis : [Tesis];
}

export interface Tesis {
    titulo: string;
    alumno: string;
    asesor: string;
    periodo: string;
    estatus: string;
    aprobacion: { 
        nombre: string | null; 
        fechaAprobacion: string | null 
    };
    url: string | null;
    fechaInicio: string;
    fechaEntrega: string | null;
    areaConocimiento: string;
    resumen: string | null;
    _id : string;
    nombreAlumno: string;
    nombreAsesor: string;
}

export type TesisRegister = Pick<Tesis, "titulo" | "areaConocimiento" | "periodo">
export type EditTesis = Pick<Tesis, "titulo" | "areaConocimiento" | "resumen" | "url" | "periodo">