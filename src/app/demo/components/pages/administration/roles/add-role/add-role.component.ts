import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../service/role.service';

@Component({
    selector: 'app-add-role',
    templateUrl: './add-role.component.html',
    styleUrl: './add-role.component.scss',
})
export class AddRoleComponent {

    RoleInformation;

    permissions!: any[];
    submitted: boolean = false;

    selectedPermissions!: any[];
    visible: boolean = false;

    constructor(private RoleService: RoleService, private router: Router) {

    }

    ngOnInit() {
        this.RoleInformation =  this.RoleService.RoleAssignInformation
    }

    showDialog() {
        this.visible = true;
    }






    nextPage() {

        if (this.selectedPermissions) {
            this.RoleInformation.permissions = this.selectedPermissions;

            if (this.RoleInformation.name_role && this.RoleInformation.description && this.RoleInformation.permissions) {
                this.RoleService.RoleAssignInformation = this.RoleInformation;
                console.log(this.RoleService.RoleAssignInformation)

            this.router.navigateByUrl(
                'work/pages/administration/roles/assign_role'
            );


                return;
            }
          }



        this.submitted = true;





    }
}
