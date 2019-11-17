import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  name: string = "";
  tab: any[] = [];
  constructor() {}

  ngOnInit() {}

  addToList() {
    let objet = {
      content: this.name,
      id: this.tab.length + 1,
      isDone: false,
      isRemoved: false,
      date: new Date()
    };
    this.tab.push(objet);
    this.name = "";
  }
  remove(element) {
    this.tab[element].isRemoved = true;
    // this.tab = this.tab.filter((s)=>s != item)
  }
  done(i) {
    this.tab[i].isDone = true;
  }
}
