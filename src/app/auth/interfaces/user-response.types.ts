export interface UserSession {
    ultimaSesion: string;
    codigoAcceso: string;
  }
  
export interface User {
  sesion: UserSession;
  _id: string;
  nombre: string;
  correo: string;
  tipoCuenta: string;
  estatusCuenta: string;
  fechaRegistro: string;
  horaRegistro: string;
  __v: number;
}

export interface UserResponse {
  success: boolean;
  httpCode: number;
  user: User;
}

export interface UserAccountResponse {
  success: boolean;
  httpCode: number;
  accountType: string;
}