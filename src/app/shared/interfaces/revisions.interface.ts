// Interfaces relacionadas con la paginación
import { Pagination } from "./pagination.interface";
import { ServerResponse } from "./server.interface";
import { Assignment } from "./assignments.interface";

export interface RegisterRevision extends Assignment{
    linkEntrega : string;
}