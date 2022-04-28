import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundMainComponent } from './page-not-found-main.component';

describe('PageNotFoundMainComponent', () => {
  let component: PageNotFoundMainComponent;
  let fixture: ComponentFixture<PageNotFoundMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
