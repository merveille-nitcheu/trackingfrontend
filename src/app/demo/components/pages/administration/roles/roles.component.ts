import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

    active: number | undefined = 0;
    items: MenuItem[] | undefined;



    ngOnInit() {
        this.items = [
            {
                label: 'Personal Info'
            },
            {
                label: 'Reservation'
            },
            {
                label: 'Review'
            }
        ];
    }

}
