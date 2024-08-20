import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../service/role.service';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrl: './assign-role.component.scss'
})
export class AssignRoleComponent {
    RoleInformation
    list_users
    selectedUsers
    submitted: boolean = false;

    constructor(private RoleService: RoleService, private router: Router) {

    }

    ngOnInit() {

        this.RoleInformation =  this.RoleService.RoleAssignInformation
        console.log(this.RoleInformation)
    }


    nextPage() {

        if (this.selectedUsers) {
            this.RoleInformation.list_users = this.selectedUsers;

            if (this.RoleInformation.list_users) {
                this.RoleService.RoleAssignInformation = this.RoleInformation;
                console.log(this.RoleService.RoleAssignInformation)

                this.router.navigateByUrl(
                    'work/pages/administration/roles/confirmation'
                );


                return;
            }
          }



    }

    prevPage() {
        this.router.navigateByUrl(
            'work/pages/administration/roles/add_role'
        );

    }

    adduser(){

        this.router.navigateByUrl(
            'work/pages/administration/admin-user'
        );
    }

}
