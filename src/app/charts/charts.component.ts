import { Component, OnInit, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from '../_models/survey.model';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  // public chartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // }
  url = "../assets/alphas.json"
  // public chartLabels = [];
  // public chartType = "bar";
  // public chartLegend = '';
  // public chartData: [];
  private survey: Survey[];
  public Alpha = [];
  public AlphasCharts: [];
  public AlphaName: string;
  public State = [];
  public StateName: string;
  public Details = {};

  //------------------------------------------------------
  results = new Map();
  group: any;
  Stackeholderlabel = [];
  OpportunityLabel = [];
  OpportunityScore = [];
  RequirementLabel = [];
  RequirementScore = [];
  SoftwareSystemLabel = [];
  SoftwareSystemScore = [];
  TeamLabel = [];
  TeamScore = [];
  WorkLabel = [];
  WorkScore = [];
  WayOfWorkingLabel = [];
  WayOfWorkigScore = [];
  StackholderScore = [];
  CategoryGroup: any;
  CategoryLabel = [];
  CategoryScore = [];
  CategoryResults = new Map();
  dataSet: any;
  public chartType = 'bar';
  public radarChartType = 'radar';

  public OpportunityChartDatasets: Array<any> = [
    { data: this.OpportunityScore, label: 'StackHolders Current' },
    { data: [], label: 'StackHolders Previous' }
  ];
  public OpportunityChartLabel: Array<any> = this.OpportunityLabel;
  public RequirementsChartDatasets: Array<any> = [
    { data: this.RequirementScore, label: 'StackHolders Current' },
    { data: [], label: 'StackHolders Previous' }
  ];
  public RequirementsChartLabel: Array<any> = this.RequirementLabel;
  public SoftwareSystemChartDatasets: Array<any> = [
    { data: this.SoftwareSystemScore, label: 'StackHolders Current' },
    { data: [], label: 'StackHolders Previous' }
  ];
  public SoftwareSystemChartLabel: Array<any> = this.SoftwareSystemLabel;
  public TeamChartDatasets: Array<any> = [
    { data: this.TeamScore, label: 'StackHolders Current' },
    { data: [], label: 'StackHolders Previous' }
  ];
  public TeamChartLabel: Array<any> = this.TeamLabel;
  public WorkChartDatasets: Array<any> = [
    { data: this.WorkScore, label: 'StackHolders Current' },
    { data: [], label: 'StackHolders Previous' }
  ];
  public WorkChartLabel: Array<any> = this.WorkLabel;
  public WayOfWorkingChartDatasets: Array<any> = [
    { data: this.WayOfWorkigScore, label: 'StackHolders Current' },
    { data: [], label: 'StackHolders Previous' }
  ];
  public WayOfWorkigChartLabel: Array<any> = this.WayOfWorkingLabel;
  public chartDatasets: Array<any> = [
    { data: this.StackholderScore, label: 'StackHolders Current' },
    { data: [], label: 'StackHolders Previous' }
  ];

  public chartLabel: Array<any> = this.Stackeholderlabel;
  public radarChartData: Array<any> = [
    { data: this.CategoryScore, label: 'StackHolders Current' },

  ];
  public radarChartLabels: Array<any> = this.CategoryLabel;
  // public OpportunityDisplayLabel: Array<any> = this.OpportunityLabel;
  public chartColors: Array<any> = [
    {
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  //-------------------------------------------------

  constructor(injector: Injector, private dataService: DataService) { }

  ngOnInit() {
    this.getDataFromJson();
    console.log('ngoninit' + this.dataSet);
    this.GroupData();
    this.populateBarArrays();
  }

  getDataFromJson() {
    // this.http.get(this.url).toPromise().then(data => {
    //   this.dataSet = data;
    //   console.log(this.dataSet);
    // });
    // this.dataSet = this.http.get(this.url);
    this.dataService.getAll().subscribe((data: any) => {
      this.dataSet = data;
    });

    console.log(this.dataSet);

    return this.dataSet;
  }

  calculateBarAverage(): void {
    for (const key in this.group) {
      const value = this.group[key];
      // tslint:disable-next-line:radix
      const Baraverage = value.reduce((total: number, item: { Response: string; }) => total += parseInt(item.Response), 0) / value.length;
      this.results.set(key, Baraverage * 100);
    }
  }


  GroupData() {
    this.dataSet = this.dataSet;
    console.log('hello' + this.dataSet);
    this.CategoryGroup = this.dataSet.reduce((r, a) => {
      const key = a.Section;
      r[key] = [...r[key] || [], a];
      return r;
    }, {});

    for (const k in this.CategoryGroup) {
      this.group = this.CategoryGroup[k].reduce((r, a) => {
        const key = a.Section + '-' + a.Level;
        r[key] = [...r[key] || [], a];
        return r;
      }, {});
      this.calculateBarAverage();
    }
  }

  populateBarArrays() {
    for (let entry of this.results.entries()) {
      console.log(entry);
      console.log('hello');
      if (entry[0].substring(0, entry[0].indexOf('-')) === 'Stakeholders') {
        this.Stackeholderlabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.StackholderScore.push(entry[1]);

      } else if (entry[0].substring(0, entry[0].indexOf('-')) === 'Opportunity') {
        this.OpportunityLabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.OpportunityScore.push(entry[1]);
      } else if (entry[0].substring(0, entry[0].indexOf('-')) === 'Opportunity') {
        this.OpportunityLabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.OpportunityScore.push(entry[1]);
      } else if (entry[0].substring(0, entry[0].indexOf('-')) === 'Requirements') {
        this.RequirementLabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.RequirementScore.push(entry[1]);

      } else if (entry[0].substring(0, entry[0].indexOf('-')) === 'Software System') {
        this.SoftwareSystemLabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.SoftwareSystemScore.push(entry[1]);

      } else if (entry[0].substring(0, entry[0].indexOf('-')) === 'Team') {
        this.TeamLabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.TeamScore.push(entry[1]);

      } else if (entry[0].substring(0, entry[0].indexOf('-')) === 'Work') {
        this.WorkLabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.WorkScore.push(entry[1]);

      } else if (entry[0].substring(0, entry[0].indexOf('-')) === 'Way of working') {
        this.WayOfWorkingLabel.push(entry[0].substring(entry[0].indexOf('-') + 1, entry[0].length));
        this.WayOfWorkigScore.push(entry[1]);
      }
    }
  }

}







