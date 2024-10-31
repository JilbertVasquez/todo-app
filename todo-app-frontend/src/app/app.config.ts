import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

function getToken() {
    return localStorage.getItem('Todo-App-Token');
}

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            JwtModule.forRoot({
                config: {
                    tokenGetter: getToken,
                    allowedDomains: ['localhost:5279'],
                    disallowedRoutes: []
                }
            })
        ),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync()
    ],
};
