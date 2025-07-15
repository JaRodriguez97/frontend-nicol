export interface Usuario {
  _id?: string;
  celular: number;
  nombre: string;
  rol: RolUsuario;
  citas?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type RolUsuario = 'admin' | 'cliente';

export interface LoginRequest {
  celular: number;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Usuario | null;
  token: string | null;
}