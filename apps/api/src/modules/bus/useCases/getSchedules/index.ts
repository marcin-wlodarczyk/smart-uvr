import {GetSchedulesController} from "./GetSchedulesController";
import {uvrService} from "../../services";

const getSchedulesController = new GetSchedulesController(uvrService);

export {getSchedulesController};