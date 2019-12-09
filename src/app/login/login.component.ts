import { UserService } from "./../apis/user.service";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { User } from "../user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private apis: UserService) {}
  loginForm: FormGroup;
  email;
  password;

  message = "";
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl([Validators.required, Validators.email]),
      password: new FormControl([Validators.required, Validators.minLength(6)])
    });
  }
  save() {
    let body = { email: this.email, password: this.password };
    this.apis.signIn(body).subscribe((data: any) => {
      if (data.message) {
        this.message = data.message;
        Swal.fire("Erreur ", "Adresse email non existante", "warning");
      } else {
        localStorage.setItem("user", JSON.stringify(data)); // transformer l'objet du format json au format string
        this.router.navigate(["/produits"]);
      }
    });
  }
}
