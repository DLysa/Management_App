import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreUSureComponent } from './are-u-sure.component';

describe('AreUSureComponent', () => {
  let component: AreUSureComponent;
  let fixture: ComponentFixture<AreUSureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreUSureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreUSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
