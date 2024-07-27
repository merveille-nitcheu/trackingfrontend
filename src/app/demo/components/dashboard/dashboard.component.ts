import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

   

    constructor(public layoutService: LayoutService) {
        
    }

    ngOnInit() {
        
    }

   

    ngOnDestroy() {
        
    }
}
