import { Injectable } from '@angular/core';
import { StorageService } from './almacenamiento.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Obtén los usuarios desde el servidor JSON
      const users: any = await this.http.get(this.apiUrl).toPromise();
      const user = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (user) {
        // Guarda los datos del usuario en el almacenamiento local
        await this.storage.set('user', user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al autenticar:', error);
      return false;
    }
  }

  async getUser() {
    return await this.storage.get('user');
  }

  async logout() {
    await this.storage.remove('user');
  }

  async getAllUsers(): Promise<any> {
    try {
      return await this.http.get<any>(this.apiUrl).toPromise();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }
}
