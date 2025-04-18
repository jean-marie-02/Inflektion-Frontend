import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root',
})

export class PartnerService {
  private apiUrl = 'https://mockanapi.com/s/67ae1b3403f9ffca6f47eb79/partners?mock_delay=5000';

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
        let jsonResponse: {[key:string]: Partner;} = {
          "0": {
            "id": 1,
            "partnerName": "Green Living",
            "partnerType": "Influencer",
            "conversions": 7,
            "commissions": 420,
            "grosssales": 620,
            "contract": "Partner Default"
          },
          "1": {
            "id": 2,
            "partnerName": "Healthy Haven",
            "partnerType": "Ambassador",
            "conversions": 1011,
            "commissions": 1250,
            "grosssales": 3250,
            "contract": "30% Commission"
          },
          "2": {
            "id": 3,
            "partnerName": "Eco Gains",
            "partnerType": "Brand Partnership",
            "conversions": 4,
            "commissions": 700,
            "grosssales": 2480,
            "contract": "Super Affiliate"
          },
          "3": {
            "id": 4,
            "partnerName": "Wellness Life",
            "partnerType": "Staff",
            "conversions": 23,
            "commissions": 1890,
            "grosssales": 3790,
            "contract": "Partner Default"
          },
          "4": {
            "id": 5,
            "partnerName": "Vegan Boost",
            "partnerType": "Staff",
            "conversions": 19,
            "commissions": 315,
            "grosssales": 1210,
            "contract": "Partner Default"
          },
          "5": {
            "id": 6,
            "partnerName": "Mindful Marketplace",
            "partnerType": "Influencer",
            "conversions": 5,
            "commissions": 1540,
            "grosssales": 2200,
            "contract": "Super Affiliate"
          },
          "6": {
            "id": 7,
            "partnerName": "Purely Plant",
            "partnerType": "Ambassador",
            "conversions": 11,
            "commissions": 945,
            "grosssales": 1890,
            "contract": "30% Commission"
          },
          "7": {
            "id": 8,
            "partnerName": "Nature's Harmony",
            "partnerType": "Brand Partnership",
            "conversions": 28,
            "commissions": 1320,
            "grosssales": 2880,
            "contract": "Partner Default"
          },
          "8": {
            "id": 9,
            "partnerName": "Wellness Warriors",
            "partnerType": "Influencer",
            "conversions": 2,
            "commissions": 200,
            "grosssales": 750,
            "contract": "30% Commission"
          },
          "9": {
            "id": 10,
            "partnerName": "Herbal Horizons",
            "partnerType": "Ambassador",
            "conversions": 14,
            "commissions": 1780,
            "grosssales": 3640,
            "contract": "Super Affiliate"
          },
          "10": {
            "id": 11,
            "partnerName": "ActiveLife Co",
            "partnerType": "Staff",
            "conversions": 9,
            "commissions": 660,
            "grosssales": 1320,
            "contract": "Partner Default"
          },
          "11": {
            "id": 12,
            "partnerName": "Vitality Partners",
            "partnerType": "Brand Partnership",
            "conversions": 1200,
            "commissions": 490,
            "grosssales": 980,
            "contract": "30% Commission"
          },
          "12": {
            "id": 13,
            "partnerName": "Clean Living Co",
            "partnerType": "Influencer",
            "conversions": 22,
            "commissions": 1490,
            "grosssales": 2950,
            "contract": "Super Affiliate"
          },
          "13": {
            "id": 14,
            "partnerName": "Eco Roots",
            "partnerType": "Ambassador",
            "conversions": 6,
            "commissions": 250,
            "grosssales": 940,
            "contract": "Partner Default"
          },
          "14": {
            "id": 15,
            "partnerName": "Herb & Health",
            "partnerType": "Staff",
            "conversions": 17,
            "commissions": 1110,
            "grosssales": 3110,
            "contract": "30% Commission"
          },
          "15": {
            "id": 16,
            "partnerName": "Healthy Vibes",
            "partnerType": "Influencer",
            "conversions": 30,
            "commissions": 560,
            "grosssales": 2780,
            "contract": "Partner Default"
          },
          "16": {
            "id": 17,
            "partnerName": "Green Body",
            "partnerType": "Brand Partnership",
            "conversions": 1,
            "commissions": 130,
            "grosssales": 350,
            "contract": "Super Affiliate"
          },
          "17": {
            "id": 18,
            "partnerName": "Pure Gains",
            "partnerType": "Staff",
            "conversions": 25,
            "commissions": 975,
            "grosssales": 1990,
            "contract": "30% Commission"
          },
          "18": {
            "id": 19,
            "partnerName": "Lifestyle Essentials",
            "partnerType": "Ambassador",
            "conversions": 2899,
            "commissions": 800,
            "grosssales": 2400,
            "contract": "Partner Default"
          },
          "19": {
            "id": 20,
            "partnerName": "Nature's Nurture",
            "partnerType": "Influencer",
            "conversions": 4,
            "commissions": 420,
            "grosssales": 830,
            "contract": "30% Commission"
          },
          "20": {
            "id": 21,
            "partnerName": "Active Gains",
            "partnerType": "Staff",
            "conversions": 1233,
            "commissions": 1670,
            "grosssales": 3340,
            "contract": "Super Affiliate"
          },
          "21": {
            "id": 22,
            "partnerName": "Earthly Essentials",
            "partnerType": "Brand Partnership",
            "conversions": 10,
            "commissions": 270,
            "grosssales": 2100,
            "contract": "Partner Default"
          }
        };
        let listUsers: Partner[] = [];
        for(const prop in jsonResponse) {
          listUsers.push(jsonResponse[prop]);
        }
        return of(listUsers);
      // return this.http.get<Partner[]>(this.apiUrl).pipe(
      //   map((jsonResponse) => { 
      //   let listUsers: Partner[] = [];
      //   for(const prop in jsonResponse) {
      //     listUsers.push(jsonResponse[prop]);
      //   }
      //   return listUsers;
      // }),
      // catchError((error) => {
      //   //console.error('Error fetching partners:', error);
      //   return of([]);
      // })
      // );
  }
}
