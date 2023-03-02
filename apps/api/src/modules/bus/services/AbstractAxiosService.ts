import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {hrtime} from "process";

interface ExtendedAxiosConfig extends AxiosRequestConfig {
    metadata?: {
        startTime: bigint;
    };
}

export class AbstractAxiosService {
    protected readonly http: AxiosInstance;

    constructor(baseURL: string) {
        this.http = axios.create({baseURL});
        this.http.interceptors.request.use(this.reqInterceptor.bind(this));
        this.http.interceptors.response.use(
            this.successfulResInterceptor.bind(this),
            this.failureResInterceptor.bind(this)
        );
    }

    private async reqInterceptor(config: ExtendedAxiosConfig): Promise<AxiosRequestConfig> {
        config.metadata = {startTime: hrtime.bigint()};
        return config;
    }

    private async successfulResInterceptor(res: AxiosResponse): Promise<AxiosRequestConfig> {
        const config = res.config as ExtendedAxiosConfig;
        const method = config.method ? config.method.toUpperCase() : '<unknown>';


        let durationSeconds = NaN;
        if (config.metadata) {
            const endTime = hrtime.bigint();
            const durationNs = endTime - config.metadata.startTime;
            const duration = Number(durationNs);
            durationSeconds = duration / 1000000000;
        }

        let url = res.config.baseURL ?? '';
        url += res.config.url;

        console.log(`${method} -> ${url} (duration: ${durationSeconds} seconds)`);
        return res;
    }

    private async failureResInterceptor(error: AxiosError): Promise<AxiosRequestConfig> {
        const method = error.config.method ? error.config.method.toUpperCase() : '<unknown>';
        let url = error.config.baseURL ?? '';
        url += error.config.url;
        console.log(`${method} -> ${url}`);
        throw error;
    }
}