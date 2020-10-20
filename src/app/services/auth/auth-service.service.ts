import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { env } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authRequest: any = this.clearAuthRequest();

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }

  clearAuthRequest(): any {
    return {
      username: "",
      password: "",
      userId: "",
      authenticate: false,
      token: ""
    };
  }

  hasLoggedUser(): Observable<boolean> {
    return Observable.create(async (observer: any) => {
      this.authRequest = await this.storage.get("auth-data") ||
        this.clearAuthRequest();

      return observer.next(this.authRequest?.authenticate);
    });
  }

  postLogin(data: any): Observable<any> {
    return this.http.post(env.url("auth"), {
      username: data.username,
      password: data.password,
    });
  }

  doLogin(data: any): Observable<boolean> {
    return Observable.create((observer: any) => {
      this.postLogin(data).subscribe(async (response) => {
        console.log('response:' + response);

        const token: string = response["token"];
        const userId: string = response["userId"]
        
        if (response['token']) {
          await this.updateAuthRequest(data.username, data.password, userId, true, token);

          return observer.next(this.authRequest?.authenticate);
        } else {
          await this.updateAuthRequest("", "", "", false, "");

          return observer.next(false);
        }
      });
    });
  }

  async doLogout(): Promise<void> {
    await this.updateAuthRequest("", "", "", false, "");
  }

  async updateAuthRequest(
    username: string,
    password: string,
    userId: string,
    authenticate: boolean,
    token: string,
  ): Promise<void> {
    this.authRequest.username = username;
    this.authRequest.password = password;
    this.authRequest.userId = userId;
    this.authRequest.authenticate = authenticate;
    this.authRequest.token = token;

    if (this.authRequest.authenticate) {
      await this.storage.set("auth-data", this.authRequest);
    } else {
      await this.storage.remove("auth-data");
    }
  }
}
