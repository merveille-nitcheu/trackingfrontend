import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        AuthRoutingModule
    ]
})
export class AuthModule { }
