import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js'; // core zone.js
import 'zone.js/testing';
import { Electronic } from './electronic';
import { provideHttpClient } from '@angular/common/http';

describe('Electronic', () => {
  let component: Electronic;
  let fixture: ComponentFixture<Electronic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Electronic],
      providers:[provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Electronic);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
