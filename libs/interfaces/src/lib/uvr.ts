export namespace Uvr {
    export interface Stop {
        id: string;
        name: string;
        nameShort: string;
        position: Position;
    }

    export interface Route {
        id: string;
        /**
         * UTAD - MONTEZELOS - BORBELA
         */
        name: string;

        /**
         * 4 - Line number
         */
        nameShort: string;
        isActive: boolean;
        journeys: Journey[];
    }

    export interface Journey {
        id: string;
        start: string;
        startTime: number;
        end: string;
        endTime: number;
        /**
         * 0 - IDA
         * 1 - VOLTA
         */
        direction: number;
        isActive: boolean;
    }

    interface Position {
        lat: number;
        lon: number;
    }

    interface Stage {
        /**
         * stopId
         */
        id: string;
        name: string;
        nameShort: string;
        position: Position;
    }

    interface Circulation {
        arrivalTime: number;
        departureTime: number;
        sequence: number;
        stage: Stage;
    }

    export interface JourneyDetails extends Journey {
        circulations: Circulation[];
    }
}
