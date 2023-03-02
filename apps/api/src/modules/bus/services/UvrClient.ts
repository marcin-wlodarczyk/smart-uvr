import {AbstractAxiosService} from "./AbstractAxiosService";
import {Uvr} from '@smart-uvr/interfaces';

export class UvrClient extends AbstractAxiosService {
    // private cache = new NodeCache({
    //     stdTTL: 60 * 60,
    // });
    constructor() {
        super('https://uvr.elevensystems.pt/api');
    }

    public async getJourneysByRouteId(routeId: string): Promise<Uvr.Journey[]> {
        const {data} = await this.http.get<Uvr.Journey[]>(`/routes/${routeId}/journeys`);
        return data;
    }

    public async getJourneyDetails(routeId: string, journeyId: string): Promise<Uvr.JourneyDetails> {
        // const cacheKey = `${routeId}${journeyId}`;
        // const cachedDetails = this.cache.get<JourneyDetails>(cacheKey);
        // if(cachedDetails) return cachedDetails;

        const {data} = await this.http.get<Uvr.JourneyDetails>(`/routes/${routeId}/journeys/${journeyId}`);

        // this.cache.set(cacheKey, data); // TODO: Remove cache

        return data;
    }

    public async getRoutesByStopId(stopId: string): Promise<Uvr.Route[]> {
        const {data} = await this.http.get<Uvr.Route[]>(`/stops/${stopId}/routes`);
        return data;
    }

    public async getStops(): Promise<Uvr.Stop[]> {
        const {data} = await this.http.get<Uvr.Stop[]>(`/stops`);
        return data;
    }
}
