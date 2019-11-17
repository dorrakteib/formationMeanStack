import { ConfigService } from "./config.service";
import { Product } from "./../product";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root" // les composants lkol ynajmou yesta3mlouh
})
export class ProductService {
  url = this.config.hostName;

  constructor(private http: HttpClient, private config: ConfigService) {}
  getAll() {
    return this.http.get(this.url + "/produits");
  }

  createProduct(produit: Product) {
    return this.http.post(this.url + "/produit", produit);
  }

  updateProduct(produit: Product) {
    return this.http.put(this.url + "/produit", produit);
  }

  deleteProduct(id) {
    return this.http.delete(this.url + "/produit/" + id);
  }
}
