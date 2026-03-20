import { RouterFeatures, Routes, withInMemoryScrolling } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent
	}
];

export const routerOptions: RouterFeatures[] = [
  withInMemoryScrolling({
    anchorScrolling: 'enabled',        
    scrollPositionRestoration: 'enabled',
  })
];