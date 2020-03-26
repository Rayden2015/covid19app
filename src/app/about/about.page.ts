import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  defaultCountry: string;
  countriesBlock: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.countries();
    this.defaultCountry = localStorage.getItem('DefaultCountry');
  }

  countries() {
    this.http.get('https://restcountries.eu/rest/v2/').subscribe((data) => {
      console.log('Countries');
      console.log(data);
      this.countriesBlock = data;
    });
  }

  setDefaultCountry() {
    console.log('setDefaultCountry ');
    localStorage.setItem('DefaultCountry', this.defaultCountry);

  }

}
