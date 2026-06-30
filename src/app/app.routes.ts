import { RouterFeatures, Routes, withInMemoryScrolling } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PrivacyPolicyComponent } from './features/sections/privacy-policy/privacy-policy.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

export const routes: Routes = [
	{
  path: '',
  component: LayoutComponent,
  children: [
     { path: '', component: LandingPageComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent }
  ]
},
]

export const routerOptions: RouterFeatures[] = [
  withInMemoryScrolling({
    anchorScrolling: 'enabled',        
    scrollPositionRestoration: 'enabled',
  })
];