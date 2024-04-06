import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Injectable, computed, signal } from '@angular/core';
import axios from 'axios';
import { News } from '../interfaces/news.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  private readonly baseUrl: string = environment.baseUrl + 'api/news';

  private _news = signal<News[]>([]);
  public news = computed(() => this._news());

  constructor(private http: HttpClient) { 
    this.getNews();
  }

  getNews() : Observable<boolean> {
    return this.http.get<News[]>(this.baseUrl).pipe(
      tap((news) => {
        this._news.set(news);
      }),
      map(() => true),
      catchError((err) => {
        return throwError(() => `Error: ${err.error.message}`);
      })
    );
  }

}
