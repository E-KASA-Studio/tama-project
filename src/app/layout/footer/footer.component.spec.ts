import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty footer container', () => {
    const element: HTMLElement = fixture.nativeElement;
    const footer = element.querySelector('footer');

    expect(footer).toBeTruthy();
    expect(footer?.id).toBe('contacts');
    expect(footer?.children.length).toBe(0);
  });
});
