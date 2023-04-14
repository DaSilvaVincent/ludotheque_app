import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauJeuComponent } from './tableau-jeu.component';

describe('TableauJeuComponent', () => {
  let component: TableauJeuComponent;
  let fixture: ComponentFixture<TableauJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauJeuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
