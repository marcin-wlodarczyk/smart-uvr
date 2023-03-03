import {Router} from 'express';
import {getStopsController} from "../useCases/getStops";
import {getSchedulesController} from "../useCases/getSchedules";

const busesRouter = Router();

busesRouter.get('/stops', (req, res) => getStopsController.execute(req, res));
busesRouter.post('/schedules', (req, res) => getSchedulesController.execute(req, res));

export {busesRouter};
