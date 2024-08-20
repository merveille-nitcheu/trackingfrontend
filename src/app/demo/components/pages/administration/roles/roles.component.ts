import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RoleService } from 'src/app/demo/service/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

    items: MenuItem[] | undefined;
    RoleInformation

    constructor(private RoleService: RoleService,
    ) {

    }



    ngOnInit(): void {

        this.items = this.RoleService.items_step;
        this.RoleInformation =  this.RoleService.RoleAssignInformation


    }

}
