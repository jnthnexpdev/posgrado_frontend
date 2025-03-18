// Estructura del cuerpo de la solicitud para iniciar sesión
export interface LoginRequest {
    correo: string;
    password: string;
}
  
// Estructura de la respuesta del servidor al iniciar sesión
export interface LoginResponse {
    success: boolean;
    httpCode: number;
    token: string;
    message: string;
}