import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

    constructor(private http: HttpClient,
    ) { }

    getListSitesForUser(){
      return this.http.get<any>(environment.apiUrl+'/site/get-list-sites-for-user');
    }

    getListSitesByUserId(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/site/get-list-sites-by-user-id', usefullData);
    }

    getListSitesByRoleName(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/site/get-list-sites-by-role-name', usefullData);
    }

    storeSite(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/site/store', usefullData);
    }

    updateSite(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/site/update', usefullData);
    }

    deleteSite(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/site/delete', usefullData);
    }

    addTrakerColor(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/site/addTrakerColor', usefullData);
    }

    getTrakerColor(siteId){
        return this.http.get<any>(environment.apiUrl+'/site/addTrakerColor'+siteId);
    }
}
