import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorRecordService {

    constructor(private http: HttpClient,
        public cookieService: CookieService,
    ) { }

    getListSensorsRecordBySensorId(usefullData: any){
      return this.http.post<any>(environment.apiUrl+'/sensor-record/find-by-sensor-id-and-period', usefullData);
    }
}
