import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagina404Page } from './pagina404.page';

describe('Pagina404Page', () => {
  let component: Pagina404Page;
  let fixture: ComponentFixture<Pagina404Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Pagina404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
