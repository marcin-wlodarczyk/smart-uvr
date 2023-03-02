import {GetStopsController} from "./GetStopsController";
import {uvrService} from "../../services";

const getStopsController = new GetStopsController(uvrService);

export {getStopsController}