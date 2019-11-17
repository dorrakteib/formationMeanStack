import { Product } from "./../product";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root" // les composants lkol ynajmou yesta3mlouh
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get("http://localhost:4200/assets/products.json");
  }

  createProduct(produit: Product) {
    return this.http.post("http://127.0.0.1:5000/produit", produit);
  }
}
