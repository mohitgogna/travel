import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthService } from 'src/app/service/login/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    if (this.auth.isLoggedIn()) {
      console.log("navigating from signin to dashboard");
      this.router.navigate(['dashboard']);
    }
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('anuj-bal', [Validators.required]),
      password: new FormControl('Anuj@124', [Validators.required])
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          if (result) {
            this.redirect();
          }
          else {
            alert("Invalid username or password");
          }
        },
        (err: Error) => {
          alert(`error - ${err.message}`);
        }
      )
    }
  }

  redirect() {
    this.router.navigate(["/dashboard"])
    // .then(() => {
    //   window.location.reload();
    // });
  }

}
