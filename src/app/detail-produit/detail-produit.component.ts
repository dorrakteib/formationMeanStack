import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail-produit",
  templateUrl: "./detail-produit.component.html",
  styleUrls: ["./detail-produit.component.css"]
})
export class DetailProduitComponent implements OnInit {
  reference;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.reference = this.route.snapshot.params["ref"]; // snapshot : capture 3al url
  }
}
