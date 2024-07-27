import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient,
    ) { }

    getListRolesForUser(){
        return this.http.get<any>(environment.apiUrl+'/role/get-list-role-auth-user');
    }

    assignRoleToUser(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/role/assign-role-to-user', usefullData);
    }
}
