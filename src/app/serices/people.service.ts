import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private _http: HttpClient) {}

  addPerson(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/people', data);
  }
  updatePerson(id: number, data: any): Observable<any> {
    return this._http.put('http://localhost:3000/people/' + id, data);
  }
  getAllPeople(): Observable<any> {
    return this._http.get('http://localhost:3000/people');
  }
  deletePerson(id: number): Observable<Object> {
    return this._http.delete('http://localhost:3000/people/' + id);
  }
}
