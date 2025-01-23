export interface ServerResponse {
    success: boolean;  // Indica si la operación fue exitosa
    httpCode: number;  // Código de estado HTTP de la respuesta
    message: string;  // Mensaje descriptivo de la respuesta
}