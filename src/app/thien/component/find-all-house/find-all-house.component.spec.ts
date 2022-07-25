import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllHouseComponent } from './find-all-house.component';

describe('FindAllHouseComponent', () => {
  let component: FindAllHouseComponent;
  let fixture: ComponentFixture<FindAllHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAllHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAllHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
