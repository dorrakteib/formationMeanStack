import { Router } from "@angular/router";
import { User } from "./../user";
import { ProductService } from "./../apis/product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-produit",
  templateUrl: "./produit.component.html",
  styleUrls: ["./produit.component.css"]
})
export class ProduitComponent implements OnInit {
  categorie = ["eyes", "lips", "skin"];
  products;
  constructor(private api: ProductService, private router: Router) {}
  productsCopy;
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user")); // reftransformer le fichier au format json
    //
    if (!this.user) {
      this.router.navigate(["/login"]);
    }

    this.api.getAll().subscribe(result => {
      this.products = result;
      this.productsCopy = this.products;
    });
  }

  filterCategorie(value) {
    this.productsCopy = this.products.filter(p => p.categorie == value);
  }

  filterOrder(value) {
    alert(value);
    if (value == "asc") {
      this.productsCopy = this.products.sort((a: any, b: any) =>
        a.prix > b.prix ? 0 : -1
      );
    }
    if (value == "desc") {
      this.productsCopy = this.products.sort((a: any, b: any) =>
        a.prix < b.prix ? 0 : -1
      );
    }
  }
}
