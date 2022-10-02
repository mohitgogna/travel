import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { FlightListComponent } from './module/flight-list/flight-list.component';
import { FlightBookingComponent } from './module/flight-booking/flight-booking.component';
import { SigninComponent } from './module/signin/signin.component';
import { UserprofileComponent } from './module/userprofile/userprofile.component';
import { ConfirmationComponent } from './module/confirmation/confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './service/token.interceptor';
import { TimePipe } from './pipe/time.pipe';
import { BookingconfirmationComponent } from './module/bookingconfirmation/bookingconfirmation.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/reducers';
import { AppConfigService } from './service/app-config.service';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
      return appConfig.loadAppConfig();
  }
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    FlightListComponent,
    FlightBookingComponent,
    SigninComponent,
    UserprofileComponent,
    ConfirmationComponent,
    TimePipe,
    BookingconfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer)
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
