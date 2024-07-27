import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

    constructor(private http: HttpClient
    ) { }

    getListSensorsWithLastRecordBySiteId(usefullData: any){
      return this.http.post<any>(environment.apiUrl+'/sensor/get-list-sensor-with-last-record-by-site-id', usefullData);
    }

    getListActifSensorsBySiteId(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/sensor/get-list-actif-sensors-by-site-id', usefullData);
    }

    getListSensorsBySiteId(usefullData: any){
        return this.http.post<any>(environment.apiUrl+"/sensor/get-list-sensors-by-site-id", usefullData);
    }

    storeSensor(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/sensor/store', usefullData);
    }

    updateSensor(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/sensor/update', usefullData);
    }

    deleteSensor(usefullData:any){
        return this.http.post<any>(environment.apiUrl+'/sensor/delete', usefullData);
    }
}
