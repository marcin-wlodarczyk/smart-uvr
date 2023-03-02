import {Router} from 'express';
import {getStopsController} from "../useCases/getStops";
import {getSchedulesController} from "../useCases/getSchedules";

const busesRouter = Router();

busesRouter.get('/stops', (req, res) => getStopsController.execute(req, res));
busesRouter.get('/schedules', (req, res) => getSchedulesController.execute(req, res));

export {busesRouter};
