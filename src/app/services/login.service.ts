import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import axios from 'axios';
import swal from 'sweetalert';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private authState$: BehaviorSubject<any> | undefined;
    urlAuth = 'http://localhost:3000/api/users'
    constructor() {
        // this.initialize();
        // Crea un observable personalizado para el estado de autenticación
        this.authState$ = new BehaviorSubject<any>(null);
    }

    private initialize(): void {
        window.addEventListener('unload', this.onUnload.bind(this));
    }

    // Define un método para obtener el observable del estado de autenticación
    authStateObservable(): Observable<User> | undefined {
        return this.authState$;
    }

    async getUsers(): Promise<User[] | undefined> {
        try {
            const response = await axios.get(this.urlAuth);
            return response.data;
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }

    async register(email: string, password: string, username: string) {
        let lenght = 0;
        try {
            const users = await this.getUsers();
            if (users) {
                const userFound = users.find((user) => user.email === email);
                lenght = users.length;
                if (userFound) {
                    throw new Error('El usuario ya existe');
                }
            }
            try {
                const user: User = {
                    username: username,
                    email: email,
                    password: password,
                };
                alert('Usuario registrado con éxito');
            } catch (error) {
                alert('No se pudo registrar el usuario')
            }
        } catch (error) {
            alert('No se pudo obtener la lista de usuarios');
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
          const userCredential = {
            email: email,
            password: password
          };
          
          const response = await axios.post(`${this.urlAuth}/login`, userCredential);
          
          if (response.data) {
            this.authState$?.next(response.data);
            console.log(response.data);
            return response.data;
          } else {
            swal('No se pudo iniciar sesión');
            return null;
          }
        } catch (error) {
            if ((error as any).response && (error as any).response.status === 401 || (error as any).response.status === 400){
                // Manejar el error cuando el usuario no está registrado
                swal('Usuario o contraseña incorrectos');
                return null;
            } else {
                // Manejar otros errores
                console.error(error);
                throw error;
            }
        }
      }
      

    async logout() {
        try {
            const res = await axios.post(`${this.urlAuth}/logout`, {}, { withCredentials: true });
            if (res) {
                window.location.href = '/home';
                alert('Sesión cerrada con éxito');
            } else {
                alert('No se pudo cerrar sesión');
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    // async getDataActualUser() {
    //     try {
    //         const res = await axios.get(`${this.urlAuth}/auth`, { withCredentials: true });
    //         if (res) {
    //             return res.data;
    //         }
    //         return null;
    //     } catch (e) {
    //         console.log(e);
    //         return null;
    //     }
    // }

    private onUnload(): void {
        this.logout();
    }

    // async getUserName() {
    //     const data = await this.getDataActualUser();
    //     if (data) {
    //         return data.name;
    //     }
    // }

    // async updateDataUser(nombre: string, apellido: string, email: string, password: string) {
    //     const data = await this.getDataActualUser();
    //     if (data) {
    //         const user: User = {
    //             id: data.id,
    //             username: nombre,
    //             email: email,
    //             password: password,
    //             isAdmin: data.isAdmin
    //         };
    //         try {
    //             const userCredential = await axios.put(`${this.urlAuth}/${data.id}`, user);
    //             alert('Usuario actualizado con éxito');
    //         } catch (error) {
    //             alert('No se pudo actualizar el usuario')
    //         }
    //     }
    // }

    // async isUserLoggedIn(): Promise<boolean> {
    //     try {
    //         const res = await axios.get(`${this.urlAuth}/auth`, { withCredentials: true });
    //         return !!res.data; // Verifica si hay datos en la respuesta
    //     } catch (e) {
    //         console.log(e);
    //         return false;
    //     }
    // }

    // isAdmin(): Observable<boolean> {
    //     return new Observable<boolean>((observer) => {
    //         this.authState$?.subscribe((user) => {
    //             if (user) {
    //                 observer.next(user.isAdmin);
    //             } else {
    //                 observer.next(false);
    //             }
    //         });
    //     });
    // }

    // async resetPassword(email: string) {
    // }
}