import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Olympic } from '../models/olympic.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient,
    private router: Router) { }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, _caught) => {
        // Display error screen if olympics data not found
        console.error(error);
        this.router.navigateByUrl('/not-found/olympics')
        this.olympics$.next([]);
        return this.olympics$;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympicByName(countryName: string): Observable<Olympic> {
    return this.olympics$.pipe(
      map(items => {
        const foundItem = items.find(item => item.country === countryName);
        const emptyOlympic: Olympic = {
          id: 0,
          country: '',
          participations: []
        }

        // Display error screen if country not found
        if (items.length !== 0 && !foundItem) {
          this.router.navigateByUrl(`not-found/${countryName}`);
        }
        
        return foundItem ?? emptyOlympic;
      }),

    )
  }

}
