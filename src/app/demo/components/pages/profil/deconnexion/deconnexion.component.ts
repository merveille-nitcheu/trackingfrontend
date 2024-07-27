import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrl: './deconnexion.component.scss'
})
export class DeconnexionComponent {

    user!: any;
    role!: any;

    constructor(public layoutService: LayoutService,
        public authService: AuthService,
        public userSiteService: UserSiteService,
        private cookieService: CookieService,
        private messageService: MessageService,
        public confirmationService: ConfirmationService,
        private router: Router
    ) { }

    ngOnInit(){
    this.user = this.authService.getUser();
    this.role = this.authService.getRole();
    ///this.getSite();
    }

    logout(){
        this.confirmationService.confirm({
            message: 'Etes vous certain de vouloir vous deconnecter ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.authService.logout().subscribe((res)=>{
                    if(res.success == true){
                        this.cookieService.deleteAll();
                        this.router.navigateByUrl("/");
                        this.messageService.add(
                            {
                                severity: 'success',
                                summary: 'Information',
                                detail: res.msg
                            }
                        );
                    }else{
                        this.messageService.add(
                            {
                                severity: 'error',
                                summary: 'Information',
                                detail: res.msg
                            }
                        );
                    }
                });
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Deleted',
                        life: 3000
                    }
                );
            },
            reject: () => {
                this.messageService.add(
                    {
                        severity: 'info',
                        summary: 'Information',
                        detail: "Annulation de la deconnexion"
                    }
                );
            }
        });
    }
}
