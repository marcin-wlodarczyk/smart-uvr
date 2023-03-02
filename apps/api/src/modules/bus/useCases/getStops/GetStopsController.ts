import {Response, Request} from 'express';
import {BaseController} from "../../../../shared/BaseController";
import {UvrService} from "../../services/UvrService";

export class GetStopsController extends BaseController {
    constructor(private uvrService: UvrService) {
        super();
    }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
        let stops = await this.uvrService.getStops();

        const q = req.query.q;

        if(q && typeof q === 'string') {
            stops = stops.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
        }

        return this.ok(res, stops);
    }
}