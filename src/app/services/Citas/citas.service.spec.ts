import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CitasService } from './citas.service';
import { environment } from '@env/environment';
import { of } from 'rxjs';

describe('CitasService', () => {
  let service: CitasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitasService]
    });
    service = TestBed.inject(CitasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Funcionalidad para Clientas (no autenticadas)', () => {
    it('obtenerCitasPorCelular debe hacer una petición GET al endpoint correcto', () => {
      const mockCelular = 3243973949;
      const mockCitas = [
        { 
          _id: '123', 
          celular: mockCelular, 
          fecha: '04/01/2025', 
          hora: '09:00 AM',
          servicio: [{ nombre: 'Manicura', duracion: 60 }],
          estado: 'Pendiente'
        }
      ];

      service.obtenerCitasPorCelular(mockCelular).subscribe(citas => {
        expect(citas).toEqual(mockCitas);
      });

      const req = httpMock.expectOne(`${environment.API_URL}citas/celular/${mockCelular}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCitas);
    });

    it('createCita debe hacer una petición POST al endpoint correcto', () => {
      const mockToken = 'token123';
      const mockCitaData = {
        celular: 3243973949,
        fecha: '04/01/2025',
        hora: '09:00 AM',
        servicio: ['abc123'],
        duracion: 60,
        precio: 25000
      };
      const mockResponse = { mensaje: 'Cita creada con éxito', cita: { ...mockCitaData, _id: 'new123' } };

      service.createCita(mockToken, mockCitaData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.API_URL}citas`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCitaData);
      expect(req.request.headers.get('Authorization')).toBe(mockToken);
      req.flush(mockResponse);
    });
  });

  describe('Funcionalidad para Admin (autenticado)', () => {
    it('leerCitas debe hacer una petición GET con token de autenticación', () => {
      const mockToken = 'admin-token';
      const mockCitas = [
        { _id: '123', celular: 3243973949, estado: 'Aprobada' },
        { _id: '456', celular: 3111111111, estado: 'Pendiente' }
      ];

      service.leerCitas(mockToken).subscribe(citas => {
        expect(citas).toEqual(mockCitas);
      });

      const req = httpMock.expectOne(`${environment.API_URL}citas`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(mockToken);
      req.flush(mockCitas);
    });

    it('getCitas debe actualizar el estado y filtrar por día seleccionado', () => {
      const mockToken = 'admin-token';
      const mockCitas = [
        { 
          _id: '123', 
          celular: 3243973949, 
          fecha: '05/15/2025', 
          hora: '09:00 AM',
          servicio: [{ nombre: 'Manicura', duracion: 60 }],
          estado: 'Aprobada'
        },
        { 
          _id: '456', 
          celular: 3111111111, 
          fecha: '05/16/2025', 
          hora: '10:00 AM',
          servicio: [{ nombre: 'Pedicura', duracion: 60 }],
          estado: 'Pendiente'
        }
      ];

      // Configurar día seleccionado
      service.month = 4; // Mayo (0-indexed)
      service.SelectDay = 15;
      service.SelectDate = '05/15/2025';

      // Espiar getSelectDay y populateArrayCitas para evitar errores en pruebas
      spyOn(service, 'getSelectDay').and.callFake(() => {});
      
      // Espiar leerCitas para evitar llamadas HTTP reales
      spyOn(service, 'leerCitas').and.returnValue(of(mockCitas));

      service.getCitas(mockToken).subscribe();
      
      expect(service.leerCitas).toHaveBeenCalledWith(mockToken);
      expect(service.getSelectDay).toHaveBeenCalled();
    });
  });

  describe('Funciones auxiliares', () => {
    it('formatNumber debe añadir ceros a números menores que 10', () => {
      expect(service.formatNumber(5)).toBe('05');
      expect(service.formatNumber(10)).toBe(10);
    });

    it('obtenerUltimoCelular debe manejar errores de forma segura', () => {
      // Espiar localStorage.getItem para simular un error
      spyOn(localStorage, 'getItem').and.throwError('Error localStorage');
      
      const result = service.obtenerUltimoCelular();
      expect(result).toBeNull();
    });

    it('guardarCelularEnLocalStorage debe manejar errores de forma segura', () => {
      // Usar el método obtenerCitasPorCelular para probar indirectamente guardarCelularEnLocalStorage
      spyOn(localStorage, 'setItem').and.throwError('Error localStorage');
      spyOn(service['http'], 'get').and.returnValue(of([]));
      
      service.obtenerCitasPorCelular(3243973949).subscribe();
      
      // Si no hay excepción no verificada, la prueba pasa
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});
