import { F1 } from './data-source';
import { yearCheck, roundCheck } from '../lib/utils';

export class DriversData extends F1 {
    constructor() {
        super();
    }

    async getDrivers(elementsPerPage: number = -1, page: number = -1) {
        if (elementsPerPage === -1) {
            return await this.get('drivers.json?limit=1000', {
                cacheOptions: { ttl: 60 }
            });
        }
        const offset = (page - 1) * elementsPerPage;
        const limit = elementsPerPage;
        const filter = `limit=${ limit }&offset=${ offset }`;
        return await this.get(`drivers.json?${ filter }`, {
            cacheOptions: { ttl: 60 }
        });
        
    }

    async getDriversByYear(year: string) {
        year = yearCheck(year);

        return await this.get(String(year).concat('/drivers').concat('.json'), {
            cacheOptions: { ttl: 60 }
        });
    }

    async getDriversByYearAndRound(year: string, round: number) {
        year = yearCheck(year);
        round = roundCheck(round);

        return await this.get(`${String(year)}/${String(round)}/drivers.json`, {
            cacheOptions: { ttl: 60 }
        });
    }
    
    async getDriver(id: string) {
        return await this.get(`drivers/${ id }.json`, {
            cacheOptions: { ttl: 60 }
        });
    }

    async getDriversSeasonRanking(year: string) {
        year = yearCheck(year);
 
        return await this.get(`${year}/driverStandings.json`, {
            cacheOptions: { ttl: 60 }
        });
    }
 
}