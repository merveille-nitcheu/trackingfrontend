import { Injectable } from '@angular/core';
//import Echo from 'laravel-echo';
import { PusherChannel } from 'laravel-echo/dist/channel';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

    private pusher: Pusher;
    private channel: any;


    constructor() {
      // Remplacez par vos propres clés
      //const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      this.pusher = new Pusher(environment.PUSHER_APP_KEY, {
            cluster: environment.PUSHER_APP_CLUSTER,
            /* authEndpoint: environment.pusherAuth,
            auth: {
                headers: {
                    'X-CSRF-TOKEN': csrfToken // Ajoutez le token CSRF ici
                }
            } */
      });
      //this.channel = this.pusher.subscribe('your-channel');
    }

   /*  constructor(private authService: AuthService) {
        const options = {
            broadcaster: 'pusher',
            key: environment.PUSHER_APP_KEY,
            cluster: environment.PUSHER_APP_CLUSTER
        }


        this.echo = new Echo({
          broadcaster: 'pusher',
          key: environment.PUSHER_APP_KEY,
          cluster: environment.PUSHER_APP_CLUSTER,
          //encrypted: true,
          //authEndpoint: environment.pusherAuth,
          auth: {
            headers: { // Ajoutez le token CSRF
              Authorization: `Bearer ${token}`
            }
          },
          client: new Pusher(options.key, options)
        });
      }

    public getEcho(): Echo {
    this.echo.connect();
    return this.echo;
    } */

    public bindEvent(eventName: string, siteId:number, callback: (data: any) => void) {
        this.channel = this.pusher.subscribe('site.'+siteId);
        this.channel.bind(eventName, callback);
    }

    public unsubscribe(){
        this.pusher.disconnect();
    }
}
