import { ServerResponse } from "./server.interface";

export interface Stats extends ServerResponse{
    stats : {
        studentCount : number;
        teacherCount : number;
        periodCount : number;
        tesisCount : number;
    }
}