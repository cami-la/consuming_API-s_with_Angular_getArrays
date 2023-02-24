import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string = 'https://randomuser.me/api'

  constructor(private http: HttpClient) { }

  //fetch users
  public getUsers(size: number = 10): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/?results=${size}`)
      .pipe(map(response => this.processResponse(response)))
  }

  //fetch one user using the UUID
  public getUser(uuid: number = 1): Observable<any> {
    return this.http
    .get<any>(`${this.apiUrl}/?uuid=${uuid}`)
    .pipe(map(response => this.processResponse(response)))
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) =>
        <User>{
          uuid: user.login.uuid,
          firstname: user.name.first,
          lastname: user.name.last,
          email: user.email,
          username: user.login.username,
          gender: user.gender,
          address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
          dateOfBirth: user.dob.date,
          phone: user.phone,
          imageUrl: user.picture.medium,
          coordinate: { latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.longitude }
        })
    }
  }
}
