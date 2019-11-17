import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit() {}

  changeLang(lang) {
    this.translate.use(lang);
  }
}
