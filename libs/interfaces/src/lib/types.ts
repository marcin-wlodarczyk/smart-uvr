export interface Stop {
    id: string;
    name: string;
}

export interface Time {
    hours: number;
    minutes: number;
    time: string;
}

export interface Journey {
    arrival: Time;
    departure: Time;
}

export interface JourneyPlan {
    origin: Stop;
    destination: Stop;
}

export interface GetSchedulesDto {
    plans: JourneyPlan[];
}

export interface Schedule {
    origin: Stop;
    destination: Stop;
    journeys: any[];
    // journeys: Journey[]; // TODO: Uncoment this
}
