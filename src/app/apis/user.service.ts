import { ConfigService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { User } from "./../user";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  url = this.config.hostName;

  constructor(private http: HttpClient, private config: ConfigService) {}

  signUp(user: User) {
    return this.http.post(this.url + "/inscription", user);
  }

  signIn(userBody: User) {
    return this.http.post(this.url + "/authentification", userBody);
  }
}
