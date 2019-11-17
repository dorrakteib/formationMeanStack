import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Microsoft";

  constructor(public translate: TranslateService) {
    translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en");
  }
}
