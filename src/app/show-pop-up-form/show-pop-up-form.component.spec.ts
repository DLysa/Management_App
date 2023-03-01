import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPopUpFormComponent } from './show-pop-up-form.component';

describe('ShowPopUpFormComponent', () => {
  let component: ShowPopUpFormComponent;
  let fixture: ComponentFixture<ShowPopUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPopUpFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPopUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
