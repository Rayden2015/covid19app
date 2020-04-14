import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { WordpressService } from '../services/wordpress.service';


@Component({
  selector: 'app-global',
  templateUrl: './global.page.html',
  styleUrls: ['./global.page.scss'],
})

export class GlobalPage implements AfterViewInit {
  constructor(private http: HttpClient, private router: Router, private wp: WordpressService) {}
  baseUrl = 'https://covid19.mathdro.id/api';
  globalCases: any;
  countriesBlock: any;
  countryCases: any;
  selectedCountry: string;
  countryLastUpated: string;
  globalLastUpdated: string;
  msg: string;
  url         = 'https://coronnavirusapp.firebaseapp.com';
  whatsappUrl = `https://wa.me/?text=${this.url}`;
  text        = 'Checkout the latest numbers on Coronavirus';

  posts = [];
  page = 1;
  count = null;


  ngAfterViewInit() {
    this.countries();
    if (localStorage.getItem('DefaultCountry')) {
      this.selectedCountry = localStorage.getItem('DefaultCountry');
    } else {
      this.selectedCountry = 'GH';
    }
    this.runAm();
    setInterval(this.runAm, 1800000); // Run every 30 minutes
  }

  async getGlobalCases() {
    console.log('getGlobalCases');
    await this.http.get(this.baseUrl).subscribe((data: any) => {
      // ('Global');
      // console.log(data);
      if (data.lastUpdate > localStorage.getItem('globalLastUpdated')) {
        // console.log('New Cases Recorded');
        this.notifyMe('New Global Cases Reported');
      } else {
        // console.log('Nothinng has changed');
      }
      localStorage.setItem('globalLastUpdated', data.lastUpdate);
      this.globalCases = data;
    });

  }

  async countries() {
    this.http.get('https://restcountries.eu/rest/v2/').subscribe((data: any) => {
      // console.log('Countries');
      // console.log(data);
      this.countriesBlock = data;
    });
  }

   async getCountryCases() {
     console.log('getCountryCases');
     localStorage.setItem('DefaultCountry', this.selectedCountry);
    // ('Country Selected : ');
    // console.log(this.selectedCountry);
     await this.http.get(`https://covid19.mathdro.id/api/countries/${this.selectedCountry}`).subscribe((data: any) => {
       // console.log('Country Cases');
       // console.log(data);
       if (data.lastUpdate > localStorage.getItem('countryLastUpdated')) {
         // console.log('New Case Recorded');
         this.notifyMe('New Cases Reported in ' + this.selectedCountry);
       } else {
         // console.log('Nothinng has changed');
       }
       localStorage.setItem('countryLastUpdated', data.lastUpdate);
       this.countryCases = data;
     });

  }


   notifyMe(msg: string) {
    if (!Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            const notify = new Notification('CoronaVirus Updates', {
                body: msg,
                icon: 'https://cdn1.vectorstock.com/i/1000x1000/39/10/corona-virus-icon-vector-29383910.jpg',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function() {
                if (p === 'granted') {
                    // show notification here
                    const notify = new Notification('CoronaVirus Updates', {
                        body: msg,
                        icon: 'https://cdn1.vectorstock.com/i/1000x1000/39/10/corona-virus-icon-vector-29383910.jpg',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function(err) {
                console.error(err);
            });
        }
    }
}

runAm() {
  console.log('Run Am');
  this.getCountryCases();
  this.getGlobalCases();
}

}
