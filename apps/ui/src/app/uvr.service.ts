import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetSchedulesDto, Schedule, Stop} from "@smart-uvr/interfaces";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UvrService {
    constructor(private http: HttpClient) {
    }

    public getStops(): Observable<Stop[]> {
        return this.http.get<Stop[]>('http://localhost:8080/v1/stops');
    }

    public getSchedules(dto: GetSchedulesDto): Observable<Schedule[]> {
        return this.http.post<Schedule[]>('http://localhost:8080/v1/schedules', dto);
    }
}
