import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { MapService } from 'src/app/demo/service/map.service';
import { RoleService } from 'src/app/demo/service/role.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { SiteService } from 'src/app/demo/service/site.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent {

    user!: any;
    listUsers: any[]=[];
    selectedUser: any={};
    role:string = "";
    adminUser: any = {};
    userDialog:boolean = false;
    submittedUser: boolean = false;

    roleDialog:boolean = false;
    submittedRole: boolean = false;
    formRole:any = null;
    loadingDropdownRole:boolean = false;
    loadingDropdownSite:boolean = false;

    listRoles: any[]=[];
    listSites: any[]=[];
    listSitesByRoleName: any[]=[];
    site:any = null;
    usefullData:any;

    constructor(public authService: AuthService,
        public userSiteService: UserSiteService,
        public sensorService: SensorService,
        public messageService: MessageService,
        public siteService: SiteService,
        public confirmationService: ConfirmationService,
        public roleService: RoleService,
        private router: Router,

    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();
        console.log("user: ", this.user);
        this.role = this.getRoleUser();
        this.getListUsersForAuthUser();
        this.getListRolesForAuthUser();
    }

    getListRolesForAuthUser(){
        this.roleService.getListRolesForUser().subscribe((res)=>{
            if(res.success == true){
                this.listRoles = res.data.list_roles;
                console.log("listRoles: ",this.listRoles);
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Successfull',
                        detail: res.msg, life: 3000
                    }
                );
            }else{
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Erreur',
                        detail: res.msg, life: 3000
                    }
                );
            }
        });
    }

    getRoleUser(){
        if(this.user.roles?.length > 0){
            return  this.user.roles[0].name;
        }else{
            return "undefined";
        }
    }

    openNew() {
        this.adminUser = {};
        this.submittedUser = false;
        this.userDialog = true;
    }

    editUser(user: any) {
        this.adminUser = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: any) {
        this.confirmationService.confirm({
            message: 'Etes vous certain de vouloir supprimer ' + user.name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.adminUser = {};
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Deleted',
                        life: 3000
                    }
                );
            },
            reject: ()=>{
                this.messageService.add(
                    {
                        severity: 'warning',
                        summary: 'Information',
                        detail: 'Suppression annullee',
                        life: 3000
                    }
                );
            }
        });
    }

    hideUserDialog() {
        this.userDialog = false;
        this.submittedUser = false;
    }

    saveUser() {
        console.log("admin-user: ", this.adminUser);
        this.submittedUser = true;
        if (this.adminUser.name?.trim()) {
            if (this.adminUser.id) {
                this.adminUser = this.addUpdateSubData(this.adminUser);
                this.authService.update(this.adminUser).subscribe((res)=>{
                    if(res.success == true){
                        this.getListUsersForAuthUser();
                        this.messageService.add(
                            {
                                severity: 'success',
                                summary: 'Successful',
                                detail: res.msg,
                                life: 3000
                            }
                        );
                    }else{
                        this.messageService.add(
                            {
                                severity: 'error',
                                summary: 'Erreur',
                                detail: res.msg,
                                life: 3000
                            }
                        );
                    }
                });
            } else {
                this.adminUser = this.addRegisterSubData(this.adminUser);
                this.authService.register(this.adminUser).subscribe((res)=>{
                    if(res.success == true){
                        this.getListUsersForAuthUser();
                        this.messageService.add(
                            {
                                severity: 'success',
                                summary: 'Successful',
                                detail: res.msg,
                                life: 3000
                            }
                        );

                    }else{
                        this.messageService.add(
                            {
                                severity: 'error',
                                summary: 'Erreur',
                                detail: res.msg,
                                life: 3000
                            }
                        );
                    }
                });
            }
            this.userDialog = false;
            this.adminUser = {};
        }
    }

    AssignRole(){
        this.router.navigate(['work','pages','administration','roles'], {
                            replaceUrl: true,
                        });
    }

    addRegisterSubData(adminUser:any){
        let adminUserR = adminUser;
        adminUserR.compagny_id = this.user.compagny_id;
        adminUserR.created_by = this.user.id;
        adminUserR.password = "password";
        adminUserR.password_confirmation = "password";
        return adminUserR;
    }

    addUpdateSubData(adminUser:any){
        let adminUserR:any = {};
        adminUserR.compagny_id = this.user.compagny_id;
        adminUserR.created_by = this.user.id;
        adminUserR.email =adminUser.email;
        adminUserR.address =adminUser.address;
        adminUserR.contact =adminUser.contact;
        adminUserR.name =adminUser.name;
        adminUserR.user_id =adminUser.id;
        return adminUserR;
    }

    getListUsersForAuthUser(){
        this.authService.getListUserForAuthUser().subscribe((res)=>{
            if(res.success == true){
                this.listUsers = res.data.list_users;
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Successfull',
                        detail: res.msg, life: 3000
                    }
                );
            }else{
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Erreur',
                        detail: res.msg, life: 3000
                    }
                );
            }
        });
    }

    getStatusDeleteUserButton(user:any){
        if(user.roles.length > 0){
            /* console.log("1: ",this.role);
            console.log("2: ",user.roles[0].name); */
            return this.role == user.roles[0].name ? true: false;
        }else{
            return false;
        }
    }

    showUserSite(user:any){
        this.listSites = [];
        this.selectedUser = user;
        this.getListSitesByUserId(this.selectedUser.id);
        console.log("selected user: ", user);
        console.log("selected user list sites: ", this.listSites);
        this.roleDialog = true;
    }

    getListSitesByUserId(userId:any){
        this.siteService.getListSitesByUserId({
            'user_id': userId
        }).subscribe((res)=>{
            if(res.success == true){
                this.listSites = res.data.list_sites;
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Successfull',
                        detail: res.msg, life: 3000
                    }
                );
            }else{
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Erreur',
                        detail: res.msg, life: 3000
                    }
                );
            }
        });
    }

    getListSitesByRoleName(roleName:string){
        this.siteService.getListSitesByRoleName({
            'role_name': roleName
        }).subscribe((res)=>{
            if(res.success == true){
                this.listSitesByRoleName = res.data.list_sites;
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Successfull',
                        detail: res.msg, life: 3000
                    }
                );
            }else{
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Erreur',
                        detail: res.msg, life: 3000
                    }
                );
            }
            this.loadingDropdownRole = false;
        });
    }

    dropdrownRoleChangeFunction(event: any){
        this.listSitesByRoleName = [];
        this.loadingDropdownRole = true;
        console.log("event: ", event);
        this.getListSitesByRoleName(event.value.name);
    }

    dropdrownSiteChangeFunction(event: any){
        this.loadingDropdownSite = true;
        console.log("event: ", event);
        this.loadingDropdownSite =false;
    }

    hideRoleDialog() {
        this.roleDialog = false;
        this.submittedRole = false;
    }

    saveRole() {
        console.log("role: ", this.formRole);
        this.submittedRole = true;
        let usefullData = this.formUsefullDataForAssignUser();
        if (usefullData != null) {
            this.roleService.assignRoleToUser(usefullData).subscribe((res)=>{
                if(res.success == true){
                    this.listSites = [];
                    //this.getListSitesByUserId(this.selectedUser.id);
                    this.getListUsersForAuthUser();
                    this.messageService.add(
                        {
                            severity: 'success',
                            summary: 'Successfull',
                            detail: res.msg, life: 3000
                        }
                    );
                }else{
                    this.messageService.add(
                        {
                            severity: 'error',
                            summary: 'Erreur',
                            detail: res.msg, life: 3000
                        }
                    );
                }
            });
            this.formRole = null;
            this.site = null;
            this.selectedUser = null;
            this.roleDialog = false;
        }
    }

    formUsefullDataForAssignUser(){
        if((this.formRole && this.listSitesByRoleName.length <= 0)){
            return {
                'role_id': this.formRole.id,
                'user_id': this.selectedUser.id
            };
        }else if(this.formRole && this.listSitesByRoleName.length > 0 && this.site){
            return {
                'role_id': this.formRole.id,
                'user_id': this.selectedUser.id,
                'site_id': this.site.id
            };
        }else{
            return null;
        }
    }

    activeSaveRole(){
        if((this.formRole && this.listSitesByRoleName.length <= 0)||
        (this.formRole && this.listSitesByRoleName.length > 0 && this.site)){
            return false;
        }else{
            return true;
        }
    }

    initPassword(user:any){
        let us = user;
        this.confirmationService.confirm({
            message: 'Etes vous certain de vouloir reinitialiser le mot de passe et envoyez le mail à ' + user.name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log("user to init: ", us);
                this.authService.initPassword({user_id: user.id}).subscribe((res)=>{
                    if(res.success == true){
                        this.messageService.add(
                            {
                                severity: 'success',
                                summary: 'Successful',
                                detail: res.msg,
                                life: 3000
                            }
                        );
                    }else{
                        this.messageService.add(
                            {
                                severity: 'error',
                                summary: 'Erreur',
                                detail: res.msg,
                                life: 3000
                            }
                        );
                    }
                });

            },
            reject: ()=>{
                this.messageService.add(
                    {
                        severity: 'warn',
                        summary: 'Information',
                        detail: 'Initialisation du mot de passe annulée',
                        life: 3000
                    }
                );
            }
        });
    }
}
