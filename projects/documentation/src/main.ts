import { bootstrapApplication } from '@angular/platform-browser'; 
import { AppComponent } from './app/app.component'; 
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';   
import { ROUTES } from './app/root/root.routing';

const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(ROUTES, withHashLocation()), 
    provideHttpClient(), 
  ].concat([])
};
 
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); 