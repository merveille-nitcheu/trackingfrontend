import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        public cookieService: CookieService,
    ) { }


    register(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/auth/register', usefullData);
    }

    update(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/auth/update', usefullData);
    }

    login(usefullData: any){
      return this.http.post<any>(environment.apiUrl+'/auth/login', usefullData);
    }

    logout(){
        return this.http.get<any>(environment.apiUrl+'/auth/logout');
    }

    loginWithToken(){
        return this.http.get<any>(environment.apiUrl+'/auth/login-with-token');
    }

    getListUserForAuthUser(){
        return this.http.get<any>(environment.apiUrl+'/auth/get-list-user-for-auth-user');
    }

    storeToken(token: string){
        this.cookieService.set("token", token, { expires: 1, sameSite: 'Lax' });
    }
    storeUser(user: any){
        this.cookieService.set("user", JSON.stringify(user), { expires: 1, sameSite: 'Lax' });
    }

    getToken(){
        let token!: string;
        token = this.cookieService.get("token");
        return token;
    }

    getRole(){
        let role!: string;
        role = this.cookieService.get("role");
        return role;
    }

    getUser(){
        let user!: any;
        user = this.cookieService.get("user");
        if(user != null && user.length > 0){
            user = JSON.parse(user);
        }
        return user;
    }

    changePassword(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/auth/change-password-by-user-id', usefullData);
    }

    initPassword(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/auth/init-password-by-user-id', usefullData);
    }

    initPasswordByEmail(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/auth/init-password-by-email', usefullData);
    }


}
