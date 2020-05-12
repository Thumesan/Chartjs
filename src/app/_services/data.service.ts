import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from '../_models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:any
  constructor(private http: HttpClient) {}

  // getSurveyResponses(){
  //     this.http.get("../assets/alphas.json").toPromise().then(data => {
  //       data
  //       return data;
  //     });
  //   }

  getAll() {
    return this.http.get('../assets/alphas.json');     
  }
}
