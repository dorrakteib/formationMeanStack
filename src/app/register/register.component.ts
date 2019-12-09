import { User } from "./../user";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../apis/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User = new User();
  message = "";

  constructor(
    public translate: TranslateService,
    private apis: UserService,
    private router: Router
  ) {
    translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en");
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl([
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl([Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl([Validators.required]),
      email: new FormControl([Validators.required, Validators.email]),
      password: new FormControl([Validators.required, Validators.minLength(6)])
    });
  }

  register() {
    console.log(this.user);
    this.apis.signUp(this.user).subscribe((data: any) => {
      if (data.message) {
        this.message = data.message;
        Swal.fire("Erreur ", "Cette adresse email existe déja", "warning");
      } else {
        Swal.fire(
          "Welcome " + this.user.firstName + " " + this.user.lastName,
          "Votre inscription a été enregistrée avec succées",
          "success"
        );
        this.router.navigate(["/login"]);
      }
    });
  }

  changeLang(lang) {
    this.translate.use(lang);
  }
}
