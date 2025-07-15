import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * Configura TestBed para las pruebas de componentes
 * @param components Lista de componentes a declarar
 * @param providers Lista de servicios a proporcionar
 * @param imports Módulos adicionales a importar
 */
export function configureTestingModule(
  components: any[] = [],
  providers: any[] = [],
  imports: any[] = []
) {
  TestBed.configureTestingModule({
    declarations: [...components],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      ReactiveFormsModule,
      FormsModule,
      FontAwesomeModule,
      ...imports
    ],
    providers: [...providers],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite elementos personalizados sin error
  }).compileComponents();
}

/**
 * Crea un spy para un servicio con métodos predefinidos
 * @param serviceName Nombre del servicio
 * @param methods Lista de métodos a espiar
 * @returns Objeto spy del servicio
 */
export function createServiceSpy(serviceName: string, methods: string[]): jasmine.SpyObj<any> {
  return jasmine.createSpyObj(serviceName, methods);
}

/**
 * Crea un spy para un servicio con propiedades observables
 * @param serviceName Nombre del servicio
 * @param methods Lista de métodos a espiar
 * @param props Objeto con propiedades a definir
 * @returns Objeto spy del servicio con propiedades
 */
export function createServiceWithProps(
  serviceName: string,
  methods: string[] = [],
  props: Record<string, any> = {}
): jasmine.SpyObj<any> {
  const spy = jasmine.createSpyObj(serviceName, methods, props);
  return spy;
}
