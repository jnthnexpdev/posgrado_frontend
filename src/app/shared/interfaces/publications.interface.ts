import { ServerResponse } from "./server.interface";

export interface PublicationResponseServer extends ServerResponse{
    publication : Publication
}

export interface Publication {
    revista: string;
    alumno: string;
    url: string | null;
    fechaPublicacion: string;
    fechaRegistro: string | null;
    _id : string;
}

export type PublicationForm = Pick<Publication, "revista" | "url" | "fechaPublicacion">