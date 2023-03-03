import {Component, OnInit} from '@angular/core';
import {UvrService} from "../uvr.service";
import {JourneyPlan, Schedule, Stop, StopId} from "@smart-uvr/interfaces";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, of, startWith} from "rxjs";
import {DateTime} from "luxon";

@Component({
    selector: 'smart-uvr-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    displayedColumns = ['departure', 'arrival'];
    stops: Stop[] = [];
    filteredOriginStops: Observable<Stop[]> = of([]);
    filteredDestinationStops: Observable<Stop[]> = of([]);
    schedules: Schedule[] = [{
        "origin": {"id": "1347", "name": "BORBELA LARGO"},
        "destination": {"id": "1019", "name": "UTAD PEDAGOGICO"},
        "journeys": [{
            "departure": {"time": "07:40", "hours": 7, "minutes": 40},
            "arrival": {"time": "08:16", "hours": 8, "minutes": 16}
        }, {
            "departure": {"time": "08:15", "hours": 8, "minutes": 15},
            "arrival": {"time": "08:51", "hours": 8, "minutes": 51}
        }, {
            "departure": {"time": "09:10", "hours": 9, "minutes": 10},
            "arrival": {"time": "09:46", "hours": 9, "minutes": 46}
        }, {
            "departure": {"time": "10:10", "hours": 10, "minutes": 10},
            "arrival": {"time": "10:46", "hours": 10, "minutes": 46}
        }, {
            "departure": {"time": "12:50", "hours": 12, "minutes": 50},
            "arrival": {"time": "13:26", "hours": 13, "minutes": 26}
        }, {
            "departure": {"time": "15:10", "hours": 15, "minutes": 10},
            "arrival": {"time": "15:46", "hours": 15, "minutes": 46}
        }, {
            "departure": {"time": "17:45", "hours": 17, "minutes": 45},
            "arrival": {"time": "18:21", "hours": 18, "minutes": 21}
        }]
    }, {
        "origin": {"id": "1151", "name": "TORRES DAS FLORES"},
        "destination": {"id": "1018", "name": "UTAD REITORIA"},
        "journeys": [{
            "departure": {"time": "07:30", "hours": 7, "minutes": 30},
            "arrival": {"time": "08:02", "hours": 8, "minutes": 2}
        }, {
            "departure": {"time": "08:40", "hours": 8, "minutes": 40},
            "arrival": {"time": "09:12", "hours": 9, "minutes": 12}
        }, {
            "departure": {"time": "09:15", "hours": 9, "minutes": 15},
            "arrival": {"time": "09:41", "hours": 9, "minutes": 41}
        }, {
            "departure": {"time": "09:45", "hours": 9, "minutes": 45},
            "arrival": {"time": "10:11", "hours": 10, "minutes": 11}
        }, {
            "departure": {"time": "10:15", "hours": 10, "minutes": 15},
            "arrival": {"time": "10:41", "hours": 10, "minutes": 41}
        }, {
            "departure": {"time": "10:45", "hours": 10, "minutes": 45},
            "arrival": {"time": "11:11", "hours": 11, "minutes": 11}
        }, {
            "departure": {"time": "11:20", "hours": 11, "minutes": 20},
            "arrival": {"time": "11:48", "hours": 11, "minutes": 48}
        }, {
            "departure": {"time": "12:30", "hours": 12, "minutes": 30},
            "arrival": {"time": "13:02", "hours": 13, "minutes": 2}
        }, {
            "departure": {"time": "13:15", "hours": 13, "minutes": 15},
            "arrival": {"time": "13:41", "hours": 13, "minutes": 41}
        }, {
            "departure": {"time": "13:50", "hours": 13, "minutes": 50},
            "arrival": {"time": "14:22", "hours": 14, "minutes": 22}
        }, {
            "departure": {"time": "15:00", "hours": 15, "minutes": 0},
            "arrival": {"time": "15:26", "hours": 15, "minutes": 26}
        }, {
            "departure": {"time": "15:40", "hours": 15, "minutes": 40},
            "arrival": {"time": "16:06", "hours": 16, "minutes": 6}
        }, {
            "departure": {"time": "18:10", "hours": 18, "minutes": 10},
            "arrival": {"time": "18:42", "hours": 18, "minutes": 42}
        }, {
            "departure": {"time": "18:50", "hours": 18, "minutes": 50},
            "arrival": {"time": "19:16", "hours": 19, "minutes": 16}
        }]
    }];
    group: FormGroup;
    selectedTime = '';

    presetPlans: JourneyPlan[] = [
        {
            originStopId: StopId.BorbelaLargo,
            destinationStopId: StopId.UtadPedagogico,
        },
        {
            originStopId: StopId.TorresDasFlores,
            destinationStopId: StopId.UtadReitoria,
        }
    ];

    constructor(private uvrService: UvrService, private fb: FormBuilder) {
        this.group = fb.group({
            originStop: [null, [Validators.required]],
            destinationStop: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.uvrService
            .getStops()
            .subscribe((stops) => this.stops = stops);

        const originCtrl = this.group.get('originStop');
        if (originCtrl) {
            this.filteredOriginStops = originCtrl.valueChanges.pipe(
                startWith(''),
                map((value: string | Stop) => {
                    if (value && typeof value === 'string') return this.stopFilter(value);
                    return this.stops;
                }),
            )
        }

        const destinationCtrl = this.group.get('destinationStop');
        if (destinationCtrl) {
            this.filteredDestinationStops = destinationCtrl.valueChanges.pipe(
                startWith(''),
                map((value: string | Stop) => {
                    if (value && typeof value === 'string') return this.stopFilter(value);
                    return this.stops;
                }),
            )
        }

        // this.selectedTime.valueChanges.subscribe((v) => console.log(v));

        // this.loadPresetPlans();
    }

    onTimeChanged() {
        this.filterSchedulesByTime(this.selectedTime);
    }

    filterSchedulesByTime(time: string) {
        const maxArrivalDt = DateTime.fromISO(`2000-01-01T${time}`);
        this.schedules = this.schedules.map((s) => {
            s.journeys = s.journeys.filter((j) => {
                const arrivalDt = DateTime.fromISO(`2000-01-01T${j.arrival.time}`);
                return arrivalDt < maxArrivalDt;
            });
            return s;
        });
    }

    loadPresetPlans() {
        this.uvrService.getSchedules({
            plans: this.presetPlans
        }).subscribe((schedules) => this.schedules = schedules);
    }

    swapStops() {
        const originCtrl = this.group.get('originStop');
        const destinationCtrl = this.group.get('destinationStop');
        if (originCtrl && destinationCtrl) {
            const val = originCtrl.value;
            originCtrl.setValue(destinationCtrl.value);
            destinationCtrl.setValue(val);
        }
    }

    private stopFilter(value: string): Stop[] {
        const filterValue = value.toLowerCase();
        return this.stops.filter((stop: Stop) => stop.name.toLowerCase().includes(filterValue));
    }

    displayStop(stop?: Stop): string {
        return stop ? `${stop.name} (${stop.id})` : '';
    }

    getSchedules(): void {
        const form = this.group.getRawValue();
        this.uvrService.getSchedules({
            plans: [
                {
                    originStopId: form.originStop.id,
                    destinationStopId: form.destinationStop.id,
                }
            ]
        }).subscribe((schedules) => this.schedules = schedules);
    }
}
