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

  it('should render the footer container', () => {
    const element: HTMLElement = fixture.nativeElement;
    const footer = element.querySelector('footer');

    expect(footer).toBeTruthy();
    expect(footer?.getAttribute('aria-label')).toBe('Footer');
  });

  it('should render section links as anchors', () => {
    const element: HTMLElement = fixture.nativeElement;
    const links = element.querySelectorAll('nav a');

    expect(links.length).toBe(3);
    expect(links[0].getAttribute('href')).toBe('#company');
    expect(links[1].getAttribute('href')).toBe('#product');
    expect(links[2].getAttribute('href')).toBe('#contacts');
  });
});
