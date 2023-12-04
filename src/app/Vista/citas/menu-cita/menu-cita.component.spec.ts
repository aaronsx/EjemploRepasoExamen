import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCitaComponent } from './menu-cita.component';

describe('MenuCitaComponent', () => {
  let component: MenuCitaComponent;
  let fixture: ComponentFixture<MenuCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCitaComponent]
    });
    fixture = TestBed.createComponent(MenuCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
