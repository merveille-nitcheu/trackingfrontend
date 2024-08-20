import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/demo/service/role.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
    RoleInformation
    list_users
    list_permissions


    constructor(private RoleService: RoleService, private router: Router) {

    }

    ngOnInit() {

        this.RoleInformation =  this.RoleService.RoleAssignInformation
        this.list_users =  this.RoleInformation.list_users.map(user => user.name)
        this.list_permissions =  this.RoleInformation.permissions.map(permission => permission.name)
        console.log(this.RoleInformation)
    }


    complete() {

        // this.router.navigateByUrl(
        //     'work/pages/administration/admin-user'
        // );

    }

    prevPage() {
        this.router.navigateByUrl(
            'work/pages/administration/roles/assign_role'
        );

    }

}
