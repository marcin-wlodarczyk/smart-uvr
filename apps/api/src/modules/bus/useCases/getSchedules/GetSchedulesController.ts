import {Response, Request} from 'express';
import {BaseController} from "../../../../shared/BaseController";
import {UvrService} from "../../services/UvrService";
import {DateTime} from "luxon";
import {Schedule} from "@smart-uvr/interfaces";

export class GetSchedulesController extends BaseController {
    constructor(private uvrService: UvrService) {
        super();
    }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const {originStopId, destinationStopId, arrivalTime} = req.query;

        const stops = await this.uvrService.getStops();

        const origin = stops.find((s) => s.id === originStopId);
        const destination = stops.find((s) => s.id === destinationStopId);

        if (!origin || !destination) {
            return this.fail(res, `Origin or destination not found`);
        }

        let journeys = await this.uvrService.getJourneys(origin.id, destination.id);

        if (arrivalTime) {
            const maxArrivalDt = DateTime.fromISO(`2000-01-01T${arrivalTime}`);
            journeys = journeys.filter((j) => {
                 const arrivalDt = DateTime.fromISO(`2000-01-01T${j.arrival}`);
                 return arrivalDt < maxArrivalDt;
            });
        }

        return this.ok<Schedule>(res, {
            origin,
            destination,
            journeys,
        });
    }
}
