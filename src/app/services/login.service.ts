import { Injectable } from '@angular/core';
import { StorageService } from './almacenamiento.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/users'; //cambiar localhost a la IP correspondiente

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Obtén los usuarios desde el servidor JSON
      const users: any = await this.http.get(this.apiUrl).toPromise();
      console.log('Usuarios obtenidos de la API:', users);
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

  async updatePassword(username: string, newPassword: string): Promise<boolean> {
    try {
      // Obtén la lista completa de usuarios
      const users: any = await this.getAllUsers();
  
      // Busca al usuario por nombre de usuario
      const user = users.find((u: any) => u.username === username);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
  
      // Actualiza la contraseña en el usuario encontrado
      user.password = newPassword;
  
      // Envía la solicitud PUT para actualizar la contraseña
      await this.http.put(`${this.apiUrl}/${user.id}`, user).toPromise();
  
      return true; // Retorna éxito si todo salió bien
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      return false;
    }
  }

}
