import { User } from "./../user";
import Swal from "sweetalert2";
import { ProductService } from "./../apis/product.service";
import { Product } from "./../product";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-ajout-produit",
  templateUrl: "./ajout-produit.component.html",
  styleUrls: ["./ajout-produit.component.css"]
})
export class AjoutProduitComponent implements OnInit {
  constructor(
    private apis: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  addProductForm: FormGroup;
  category = ["eyes", "lips", "skin"];
  product: Product = new Product();
  exist: boolean = false;
  products: Product[];
  reference;
  isNew = true;
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (!this.user) {
      this.router.navigate(["/login"]);
    } else {
      this.product.userId = this.user;
    }
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
      description: new FormControl([Validators.required]),
      image: new FormControl()
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
    );
    0;
  }

  save() {
    if (this.isNew) {
      //s'il s'agit d'un nouveau produit alors il sera ajouté  à la bd
      this.apis.createProduct(this.product).subscribe(data => {
        console.log(data);
        Swal.fire("saved !", "message", "success");
        this.router.navigate(["/produits"]);
      });
    } else {
      //s'il s'agit d'un ancien produit alors il sera mis à jour
      this.apis.updateProduct(this.product).subscribe(data => {
        console.log(data);
        Swal.fire("saved !", "message", "success");
        this.router.navigate(["/produits"]);
      });
    }
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

  delete() {
    Swal.fire("saved !", "message", "success");
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.value) {
        this.apis.deleteProduct(this.product._id).subscribe(data => {
          Swal.fire(" Deleted!", "", "success");
          this.router.navigate(["/produits"]);
        });
      } else {
        Swal.fire("Cancelled", "", "error");
      }
    });
  }

  upload(e) {
    var files = e.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.loader.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  loader(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.product.image = "data:image/png;base64," + btoa(binaryString);
  }
}
