import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFlowerComponent } from './svg-flower.component';

describe('SvgFlowerComponent', () => {
  let component: SvgFlowerComponent;
  let fixture: ComponentFixture<SvgFlowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgFlowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
