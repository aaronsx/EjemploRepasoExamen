import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCitaComponent } from './listado-cita.component';

describe('ListadoCitaComponent', () => {
  let component: ListadoCitaComponent;
  let fixture: ComponentFixture<ListadoCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoCitaComponent]
    });
    fixture = TestBed.createComponent(ListadoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
