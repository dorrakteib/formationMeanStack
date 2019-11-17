import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firstName;
  lastName;
  birthDate;
  email;
  password;
  show_alert = false;

  constructor(public translate: TranslateService) {
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
    this.show_alert = true;
  }

  changeLang(lang) {
    this.translate.use(lang);
  }
}
