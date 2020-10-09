import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authRequest: any = this.clearAuthRequest();

  constructor(
    private storage: Storage
  ) { }

  clearAuthRequest(): any {
    return {
      username: "",
      password: "",
      authenticate: false
    };
  }

  hasLoggedUser(): Observable<boolean> {
    return Observable.create(async (observer: any) => {
      this.authRequest = await this.storage.get("auth-data") ||
        this.clearAuthRequest();

      return observer.next(this.authRequest?.authenticate);
    });
  }

  doLogin(data: any): Observable<boolean> {
    return Observable.create(async (observer: any) => {
      await this.updateAuthRequest(data.username, data.password, true);
      return observer.next(this.authRequest?.authenticate);
    });
  }

  async doLogout(): Promise<void> {
    await this.updateAuthRequest("", "", false);
  }


  async updateAuthRequest(
    username: string,
    password: string,
    authenticate: boolean,
  ): Promise<void> {
    this.authRequest.username = username;
    this.authRequest.password = password;
    this.authRequest.authenticate = authenticate;


    if (this.authRequest.authenticate) {
      await this.storage.set("auth-data", this.authRequest);
    } else {
      await this.storage.remove("auth-data");
    }
  }
}
