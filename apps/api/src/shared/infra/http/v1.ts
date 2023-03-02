import {Router} from 'express';
import {busesRouter} from '../../../modules/bus/infra';

const v1Routes = Router();

v1Routes.use('/', busesRouter);

export {v1Routes};
