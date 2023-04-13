import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationProfilComponent } from './modification-profil.component';

describe('ModificationProfilComponent', () => {
  let component: ModificationProfilComponent;
  let fixture: ComponentFixture<ModificationProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
