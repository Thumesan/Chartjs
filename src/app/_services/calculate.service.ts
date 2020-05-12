import { Injectable } from '@angular/core';
import { Survey } from '../_models/survey.model';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  private survey: any;

  constructor(private dataService: DataService) { 
    this.doCalculations();

  }

  doCalculations(): any {
    // tslint:disable-next-line:prefer-const
    let data = this.dataService.getAll();
    this.survey = data;
    return data;
 }
  


}
