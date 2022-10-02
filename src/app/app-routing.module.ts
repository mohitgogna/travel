import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/module/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfirmationComponent } from './module/confirmation/confirmation.component';
import { FlightBookingComponent } from './module/flight-booking/flight-booking.component';
import { FlightListComponent } from './module/flight-list/flight-list.component';
import { SigninComponent } from './module/signin/signin.component';
import { UserprofileComponent } from './module/userprofile/userprofile.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  //{ path: 'flightlist', component: FlightListComponent },
  { path: 'flightlist/:flighttype/:itinerary/:pax/:triptype/:cabin', canActivate: [AuthGuard], component: FlightListComponent },
  { path: 'flightbooking', canActivate: [AuthGuard], component: FlightBookingComponent },
  { path: 'userprofile', canActivate:[AuthGuard], component: UserprofileComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
