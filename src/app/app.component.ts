
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],


  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tama-project';

  constructor(private meta: Meta) {}

  ngOnInit(): void {
    if (!environment.production) {
      this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });
    }
  }
}
