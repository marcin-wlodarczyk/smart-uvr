import {Response, Request} from 'express';
import {BaseController} from "../../../../shared/BaseController";
import {UvrService} from "../../services/UvrService";
import {DateTime} from "luxon";
import {GetSchedulesDto, Schedule} from "@smart-uvr/interfaces";

export class GetSchedulesController extends BaseController {
  constructor(private uvrService: UvrService) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const {plans} = req.body as GetSchedulesDto;

    const schedules: Schedule[] = [];
    const stops = await this.uvrService.getStops();
    for (const plan of plans) {
      const origin = stops.find((s) => s.id === plan.originStopId);
      const destination = stops.find((s) => s.id === plan.destinationStopId);

      if (!origin || !destination) {
        return this.fail(res, `Origin or destination not found`);
      }

      let journeys = await this.uvrService.getJourneys(origin.id, destination.id);

      if (plan.arrivalTime) {
        const maxArrivalDt = DateTime.fromISO(`2000-01-01T${plan.arrivalTime}`);
        journeys = journeys.filter((j) => {
          const arrivalDt = DateTime.fromISO(`2000-01-01T${j.arrival}`);
          return arrivalDt < maxArrivalDt;
        });
      }

      schedules.push({
        origin,
        destination,
        journeys,
      });
    }


    return this.ok<Schedule[]>(res, schedules);
  }
}
