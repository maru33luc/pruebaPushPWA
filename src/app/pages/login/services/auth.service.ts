import { User } from './../interfaces/user.interface';
import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interface';
import { UserRegister } from '../interfaces/user-register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior -> nadie desde fuera del servicio puede cambiar la autenticacion
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  postLogin(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}api/users/login`
    const body = { email: email, password: password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.autenticado);
        localStorage.setItem('token', token);
      }),
      map(() => true),
      catchError((err) => {
        return throwError(() => `Error: ${err.error.message}`);
      })
    );
  }

  registerUser(email: string, password: string, username: string): Observable<UserRegister>{

    const url = `${this.baseUrl}api/users/register`
    const body = { email: email, password: password, username: username };

    return this.http.post<UserRegister>(url, body).pipe(
      catchError( (err) => {
        return throwError (()=> 'Error en la carga del usuario')
      } )
    )

  }

}
