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
    return this.http.get<Partner[]>(this.apiUrl).pipe(
      map((jsonResponse) => { 
        let listUsers: Partner[] = [];
        for(const prop in jsonResponse) {
          listUsers.push(jsonResponse[prop])
        }
        return listUsers;
      }
      ),
      catchError((error) => {
        console.error('Error fetching partners:', error);
        return of([]);
      }));
  }
}
