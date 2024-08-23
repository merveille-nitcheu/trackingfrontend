import { Component, Input } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { MenuService } from '../app.menu.service';
import { MessageService } from 'primeng/api';



@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
})
export class AppConfigComponent {
    @Input() minimal: boolean = false;
    notifications:any
    nbNotifications:number = 0



    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService,
        public messageService: MessageService,
    ) {}



    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }


    onConfigButtonClick() {
        this.layoutService.getNotifications().subscribe((res)=>{
            if(res){
                this.notifications = res.data;
                console.log(this.notifications)
            }else{
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Information',
                        detail: res.msg
                    }
                );
            }

            if(this.notifications){
                this.nbNotifications = this.notifications.length
            }
        })


        this.layoutService.showConfigSidebar();

    }


}
