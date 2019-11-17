import { DetailProduitComponent } from "./detail-produit/detail-produit.component";
import { AjoutProduitComponent } from "./ajout-produit/ajout-produit.component";
import { ProduitComponent } from "./produit/produit.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { TodoComponent } from "./todo/todo.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "todo", component: TodoComponent },
      { path: "produits", component: ProduitComponent },
      { path: "ajout", component: AjoutProduitComponent },
      { path: "details/:ref", component: DetailProduitComponent },
      { path: "edit/:reference", component: AjoutProduitComponent } // on va changer le formulaire d'ajout des produits pour la modification
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
