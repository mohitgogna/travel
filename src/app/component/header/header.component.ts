import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private readonly USERNAME = "USER";
  username?: string = "";

  constructor(private _AuthService: AuthService, private _Router:Router) { }

  ngOnInit(): void {    
  }

  getUser() {
    return sessionStorage.getItem(this.USERNAME);
  }

  signout(){
    this._AuthService.logout();
    sessionStorage.removeItem(this.USERNAME);
  }

  userprofile(){
    this._Router.navigate(['userprofile'])
  }
}
