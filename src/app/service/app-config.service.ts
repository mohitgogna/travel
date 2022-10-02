import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig;

    constructor (private injector: Injector) { }

    loadAppConfig() {
        let http = this.injector.get(HttpClient);

        return http.get('/assets/appconfig.json')
        .toPromise()
        .then(data => {
            this.appConfig = data;
        })
    }

    get config() {
        return this.appConfig;
    }
}
