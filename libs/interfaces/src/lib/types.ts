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
    originStopId: string;
    destinationStopId: string;
    arrivalTime?: string;
}

export interface GetSchedulesDto {
    plans: JourneyPlan[];
}

export interface Schedule {
    origin: Stop;
    destination: Stop;
    journeys: Journey[];
}

export enum StopId {
    BorbelaLargo = '1347',
    UtadReitoria = '1018',
    UtadPedagogico = '1019',
    Montezelos01 = '1186',
    Montezelos02 = '1201',
    TorresDasFlores = '1151',
}

