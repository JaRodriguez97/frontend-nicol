export interface ApiResponse<T = any> {
  data?: T;
  mensaje?: string;
  error?: string;
  status?: number;
}

export interface ErrorResponse {
  mensaje: string;
  error?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CitaResponse {
  mensaje: string;
  cita: any;
}

export interface ValidationError {
  field: string;
  message: string;
}
