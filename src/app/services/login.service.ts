import { Injectable } from '@angular/core';
import { User }  from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    new User('UserTest','12345'),
    new User('Maximiliano','54321'),
    new User('Fernanda','67890')
  ]

  constructor() { }

  validarLogin(username: string, password: string): boolean {
    console.log("[LoginService] => validarLogin")

    return this.users.find(u => 
      u.username === username && u.password === password) !== undefined
  }
}
