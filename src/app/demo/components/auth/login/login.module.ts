import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'src/app/demo/shared/shared.module';


@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
