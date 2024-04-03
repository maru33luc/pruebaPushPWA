import { User } from '../components/interfaces/user.interface';
import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../components/interfaces/auth-status.enum';
import { LoginResponse } from '../components/interfaces/login-response.interface';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior -> nadie desde fuera del servicio puede cambiar la autenticacion
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  public login?: Observable<boolean>;

  postLogin(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}api/users/login`
    const body = { email: email, password: password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        if(user){
          this._currentUser.set(user);
        }
        this._authStatus.set(AuthStatus.autenticado);
        localStorage.setItem('token', token);
        this.login = of(true);
      }),
      map(() => true),
      catchError((err) => {
        return throwError(() => `Error: ${err.error.message}`);
      })
    );
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.noAutenticado);
    localStorage.removeItem('token');
  }

  async getUserName(): Promise<string> {
      const id = this.currentUser()?.id;
      const url = `${this.baseUrl}api/users/${id}`;
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(url, { headers });
      return response.data.username;
  }
}
