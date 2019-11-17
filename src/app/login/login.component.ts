import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor( private router: Router) {
    
  }
  loginForm: FormGroup;
  email;
  password;
  show_alert = false;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl([Validators.required, Validators.email]),
      password: new FormControl([Validators.required, Validators.minLength(6)])
    });
  }
  save() {
    this.show_alert = true;
    this.router.navigate(['/produits'])
  }
}
