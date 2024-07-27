import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { RoleService } from 'src/app/demo/service/role.service';

@Component({
  selector: 'app-user-parameters',
  templateUrl: './user-parameters.component.html',
  styleUrl: './user-parameters.component.scss'
})
export class UserParametersComponent {

    user!: any;
    role:string = "";
    userDialog:boolean = false;
    userPasswordDialog:boolean = false;
    adminUser:any = {};
    password:any = {};
    submittedUser:boolean = false;
    submittedUserPassword:boolean = false;

    constructor(public authService: AuthService,
        public messageService: MessageService,
        public confirmationService: ConfirmationService,
        public roleService: RoleService,
        public cookieService: CookieService,

    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();
        console.log("user: ", this.user);
        this.role = this.getRoleUser();
    }

    getRoleUser(){
        if(this.user.roles?.length > 0){
            return  this.user.roles[0].name;
        }else{
            return "undefined";
        }
    }

    editPassword(){
        this.password.user_id = this.user.id;
        this.userPasswordDialog = true;

    }

    editUserInfo(){
        this.adminUser = this.user;
        console.log("user info edit: ", this.adminUser);
        this.userDialog = true;
    }

    hideUserDialog(){
        this.adminUser = {};
        this.userDialog = false;
    }

    saveUser(){
        console.log("admin-user: ", this.adminUser);
        this.submittedUser = true;
        if (this.adminUser.name?.trim()) {
            if (this.adminUser.id) {
                this.adminUser = this.addUpdateSubData(this.adminUser);
                this.authService.update(this.adminUser).subscribe((res)=>{
                    if(res.success == true){
                        //console.log("res: ", res);
                        this.cookieService.delete('user');
                        this.authService.storeUser(res.data.user);
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
                this.adminUser = {};
                this.userDialog = false;
            }
        }
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

    hideUserPasswordDialog(){
        this.password = {};
        this.userPasswordDialog = false;
    }

    saveUserPassword(){
        console.log("password: ", this.password);
        this.submittedUserPassword = true;
        if(this.password.user_id && this.password.lastPassword?.trim() && this.submittedUserPassword == true){
            this.authService.changePassword(this.password).subscribe((res)=>{
                if(res.success == true){
                    this.messageService.add(
                        {
                            severity: 'success',
                            summary: 'Successful',
                            detail: res.msg,
                            life: 3000
                        }
                    );
                    this.adminUser = {};
                    this.userDialog = false;
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
        }else{
            this.messageService.add(
                {
                    severity: 'error',
                    summary: 'Erreur',
                    detail: "Verifiez l'ancien mot de passe",
                    life: 3000
                }
            );
        }

    }

}
