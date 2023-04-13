import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationAvatarProfilComponent } from './modification-avatar-profil.component';

describe('ModificationAvatarProfilComponent', () => {
  let component: ModificationAvatarProfilComponent;
  let fixture: ComponentFixture<ModificationAvatarProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationAvatarProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationAvatarProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
