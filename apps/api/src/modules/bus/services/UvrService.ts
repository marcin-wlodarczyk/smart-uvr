import {UvrClient} from "./UvrClient";
import {Uvr, Stop, Journey, Time} from "@smart-uvr/interfaces";

function secondsToTime(d: number): Time {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);

    const hDisplay = h > 0 ? h.toString().padStart(2, '0') : "00";
    const mDisplay = m > 0 ? m.toString().padStart(2, '0') : "00";

    return {
      time: hDisplay + ':' + mDisplay,
      hours: h,
      minutes: m,
    };
}

export class UvrService {
    private client: UvrClient;

    constructor() {
        this.client = new UvrClient();
    }

    public async getStops(): Promise<Stop[]> {
        const stops = await this.client.getStops();
        return stops.map((s: Uvr.Stop) => {
            const stop: Stop = {
                id: s.id,
                name: s.name,
            };
            return stop;
        });
    }

    public async getJourneys(originStopId: string, destinationStopId: string): Promise<Journey[]> {
        const routes = await this.client.getRoutesByStopId(originStopId);
        const desiredJourneys: Journey[] = [];
        for (const route of routes) {
            const journeys = await this.client.getJourneysByRouteId(route.id);
            for (const journey of journeys) {
                const journeyDetails = await this.client.getJourneyDetails(route.id, journey.id);
                let originStopCirculationIndex, destinationStopCirculationIndex;

                for (let i = 0; i < journeyDetails.circulations.length; i++) {
                    const circulation = journeyDetails.circulations[i];

                    if (circulation.stage.id === originStopId) originStopCirculationIndex = i;
                    if (circulation.stage.id === destinationStopId) destinationStopCirculationIndex = i;

                    if (originStopCirculationIndex && destinationStopCirculationIndex) break;
                }

                // if (journeyDetails.id === '789') {
                //     console.log(`origin: ${originStopId}, destination: ${destinationStopId}`);
                //     console.log(`originIndex: ${originStopCirculationIndex}, destinationIndex: ${destinationStopCirculationIndex}`);
                //     console.log(journeyDetails.circulations[originStopCirculationIndex as any]);
                //     console.log(journeyDetails.circulations[destinationStopCirculationIndex as any]);
                // }

                if (originStopCirculationIndex != undefined && destinationStopCirculationIndex != undefined && originStopCirculationIndex < destinationStopCirculationIndex) {
                    const originCirculation = journeyDetails.circulations[originStopCirculationIndex];
                    const destinationCirculation = journeyDetails.circulations[destinationStopCirculationIndex];
                    const desiredJourney: Journey = {
                        departure: secondsToTime(originCirculation.departureTime),
                        arrival: secondsToTime(destinationCirculation.arrivalTime),
                    }
                    desiredJourneys.push(desiredJourney);
                }

            }
        }
        return desiredJourneys;
    }
}
