import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSiteService {

    constructor(private http: HttpClient,
        public cookieService: CookieService,
    ) { }

    getUserSiteByUserId(usefullData: any){
      return this.http.post<any>(environment.apiUrl+'/user-site/get-user-site-by-user-id', usefullData);
    }
}
