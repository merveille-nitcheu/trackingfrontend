import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    emailCheck: boolean = false;
    user!: any;
    role!: string;
    forgetLinkClick: boolean = false;
    forgetMsg:string = "";
    forgetLoading: boolean = false;

    loginForm = this.formBuilder.group({
        email: ['',[ Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    constructor(public layoutService: LayoutService,
                public authService: AuthService,
                public messageService: MessageService,
                public formBuilder: FormBuilder,
                public cookieService: CookieService,
                public router: Router
    ) { }

    ngOnInit(){
        this.checkIfConnected();
    }

    checkIfConnected(){
        this.authService.loginWithToken().subscribe((res)=>{
            console.log("log with token: ",res);
            if(res.success == true){
                this.user = res.data;
                this.emailCheck = true;
                this.loginForm.patchValue({
                    email: this.user.email,
                    password: ""
                });
            }
        });
    }

    getWelcomeMsg(){
        if(this.user && this.user != null){
            return " back "+this.user.name;
        }else{
            return " to the sign in page";
        }
    }

    login(){
        let canSendData = this.disableSignInButton();
        if(canSendData == true){
            this.authService.login(this.loginForm.value).subscribe((res)=>{
                console.log("res login: ",res);
                if(res.success == true){
                    let token = res.data.token;
                    let user = res.data.user;
                    this.role = res.data.role;
                    this.cookieService.set("token", token, { expires: 1, sameSite: 'Lax' });
                    this.cookieService.set("role", this.role, { expires: 1, sameSite: 'Lax' });
                    this.cookieService.set("user", JSON.stringify(user), { expires: 1, sameSite: 'Lax' });
                    this.messageService.add(
                        {
                            severity: 'success',
                            summary: 'Information',
                            detail: res.msg
                        }
                    );
                    this.router.navigateByUrl("/work/dashboard");
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
        }
    }

    disableSignInButton(){
        let emailStatus = true;
        let passwordStatus = true;
        if(this.loginForm.invalid){
            if(this.loginForm.get("email").errors != null){
                //console.log(this.loginForm.get("email").errors);
                this.messageService.add(
                    {
                        severity: 'info',
                        summary: 'Information',
                        detail: 'The email address is required'
                    }
                );
            emailStatus = false;
            }
            if(this.loginForm.get("password").errors != null){
                this.messageService.add(
                    {
                        severity: 'info',
                        summary: 'Information',
                        detail: 'The password is required'
                    }
                );
                passwordStatus = false;
            }
        }
        if(emailStatus == false && passwordStatus == false){
            return false;
        }else{
            return true;
        }
    }

    passwordForgetFunction(){
        this.forgetLinkClick = true;
        let email = this.loginForm.get('email').value?.trim();
        this.forgetMsg = this.showEmailMsg(email);
        if(this.forgetLinkClick == true){
            if(email != null && email != ''){
                this.forgetLoading = true;
                this.authService.initPasswordByEmail({
                    email: email
                }).subscribe((res)=>{
                    if(res.success == true){
                        this.forgetMsg = "Veuillez consulter votre mail";
                    }else{
                        this.forgetMsg = "Veuillez contacter votre administrateur";
                    }
                    this.forgetLoading = false;
                });
            }
        }
        console.log("mail: ", this.loginForm.get('email').value?.trim());
    }

    showEmailMsg(email:string){
        let msg = "";
        if(this.forgetLinkClick == true ){
            if(email != null && email != ''){

            }else{
                msg = "Veuillez entrer votre adresse mail";
            }
        }else{

        }
        return msg;
    }

}
