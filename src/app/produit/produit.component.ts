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
  constructor(private api: ProductService) {}
  productsCopy;
  ngOnInit() {
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
