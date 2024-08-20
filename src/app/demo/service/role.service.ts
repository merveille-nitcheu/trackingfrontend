import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


    items_step = [
        {
            label: 'Creer Role',
             routerLink: 'add_role'
        },
        {
            label: 'Assigner Role',
             routerLink: 'assign_role'
        },
        {
            label: 'Confirmation',
             routerLink: 'confirmation'
        }
    ];


    permissions = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' },
    ];

    RoleAssignInformation = {
            name_role: '',
            description: '',
            site_name: '',
            permissions: this.permissions,
            list_users: this.permissions,

    };

    constructor(private http: HttpClient,
    ) { }

    getListRolesForUser(){
        return this.http.get<any>(environment.apiUrl+'/role/get-list-role-auth-user');
    }

    getPermissions(){
        return this.http.get<any>(environment.apiUrl+'/role/get-permissions');
    }

    assignRoleToUser(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/role/assign-role-to-user', usefullData);
    }
}
