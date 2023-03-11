import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteStatusComponent } from './confirmation-delete-status.component';

describe('ConfirmationDeleteStatusComponent', () => {
  let component: ConfirmationDeleteStatusComponent;
  let fixture: ComponentFixture<ConfirmationDeleteStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDeleteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
