import Swal from "sweetalert2";
import { ProductService } from "./../apis/product.service";
import { Product } from "./../product";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ajout-produit",
  templateUrl: "./ajout-produit.component.html",
  styleUrls: ["./ajout-produit.component.css"]
})
export class AjoutProduitComponent implements OnInit {
  constructor(private apis: ProductService, private route: ActivatedRoute) {}

  addProductForm: FormGroup;
  category = ["eyes", "lips", "skin"];
  product: Product = new Product();
  exist: boolean = false;
  products: Product[];
  reference;
  isNew = true;

  ngOnInit() {
    this.reference = this.route.snapshot.params["reference"];
    if (this.reference) {
      this.isNew = false;
    }

    this.addProductForm = new FormGroup({
      name: new FormControl([Validators.required]),
      category: new FormControl(),
      quantity: new FormControl([Validators.required]),
      price: new FormControl([Validators.required]),
      reference: new FormControl([Validators.required]),
      description: new FormControl([Validators.required])
    });

    this.apis.getAll().subscribe(
      (data: Product[]) => {
        //en cas de success try
        this.products = data;
        if (!this.isNew) {
          this.product = this.products.filter(
            s => s.reference == this.reference
          )[0];
          console.log(this.product);
        }
      },
      err => {
        //en cas d'erreur
      }
    );0
  }

  save() {
    //Swal.fire('saved !', 'message', 'success');
    // Swal.fire({
    //   title: "Are you sure?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Ok",
    //   cancelButtonText: "Cancel"
    
    // }).then(result => {
    //   if (result.value) {
    //     Swal.fire("Saved!", "", "success");
    //   } else {
    //     Swal.fire("Cancelled", "", "error");
    //   }
    // });

    this.apis.createProduct(this.product).subscribe(data => console.log(data));
  }

  testRef() {
    let x = this.products.filter(s => s.reference == this.product.reference);
    if (x.length > 0) {
      this.exist = true;
      console.log("this reference is existing");
    } else {
      this.exist = false;
    }
  }
}
