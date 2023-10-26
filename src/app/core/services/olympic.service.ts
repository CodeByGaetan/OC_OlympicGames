import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/olympic.model';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) { }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {

        // TODO: improve error handling
        console.error(error);

        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  // getOlympicById(id: number): Observable<Olympic> {
  //   return this.olympics$.pipe(
  //     map(items => {
  //       const foundItem = items.find(item => item.id === id);
  //       const emptyOlympic: Olympic = {
  //         id: 0,
  //         country: '',
  //         participations: []
  //       }

  //       return foundItem ? foundItem : emptyOlympic;
  //     })
  //   )
  // }

  getOlympicByName(countryName: string): Observable<Olympic> {
    return this.olympics$.pipe(
      map(items => {
        const foundItem = items.find(item => item.country === countryName);
        const emptyOlympic: Olympic = {
          id: 0,
          country: 'Not Found',
          participations: []
        }

        return foundItem ? foundItem : emptyOlympic;
      })
    )
  }

}
