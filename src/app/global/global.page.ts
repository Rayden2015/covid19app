import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-global',
  templateUrl: './global.page.html',
  styleUrls: ['./global.page.scss'],
})

export class GlobalPage implements AfterViewInit {
  constructor(private http: HttpClient, private localNotifications: LocalNotifications, private backgroundMode: BackgroundMode) {
  }

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
  counter = 1;



  ngAfterViewInit() {
    this.backgroundMode.enable();
    this.countries();
    if (localStorage.getItem('DefaultCountry')) {
      this.selectedCountry = localStorage.getItem('DefaultCountry');
    } else {
      this.selectedCountry = 'GH';
    }
    // this.runAm();
    setInterval(() => this.getUpdates(), 600000);
    this.notifyApp();
  }

  async getGlobalCases() {
    console.log('getGlobalCases');
    await this.http.get(this.baseUrl).subscribe((data: any) => {
      // ('Global');
      // console.log(data);
      if (data.lastUpdate > localStorage.getItem('globalLastUpdated')) {
        // console.log('New Cases Recorded');
        this.notifyMe('New Global Cases Reported');
        // this.notifyApp('New Global Cases Reported');
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
     this.http.get(`https://covid19.mathdro.id/api/countries/${this.selectedCountry}`).subscribe((data: any) => {
       // console.log('Country Cases');
       // console.log(data);
       if (data.lastUpdate > localStorage.getItem('countryLastUpdated')) {
         // console.log('New Case Recorded');
        //  this.notifyMe('New Cases Reported in ' + this.selectedCountry);
        //  this.notifyApp('New Cases Reported in ' + this.selectedCountry);
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
            Notification.requestPermission().then(function(p) {
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



notifyApp() {
  console.log('Global Page | notifyApp()');
    // Schedule a single notification
  this.localNotifications.schedule({
      text: 'Hello Mr Rayden',
      // sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      // data: { secret: key }
    });
}

runAm() {
  console.log('Run Am');
  this.getCountryCases();
  this.getGlobalCases();
  // this.notifyApp('Mr Rayden');
}


 getUpdates() {
  //  this.notifyMe('Notify from Get Updates()');
   this.notifyApp();
   console.log('getUpdates()');
   console.log('getGlobalCases');
   this.http.get(this.baseUrl).subscribe((data: any) => {
      this.globalCases = data;
      // ('Global');
      console.log(data);
      if (data.lastUpdate > localStorage.getItem('globalLastUpdated')) {
        // console.log('New Cases Recorded');
        // this.notifyMe('New Global Cases Reported');
        // this.notifyApp('New Global Cases Reported');
        this.notifyApp();
      } else {
        // console.log('Nothinng has changed');
      }
      localStorage.setItem('globalLastUpdated', data.lastUpdate);
    });

   console.log('getCountryCases');
   localStorage.setItem('DefaultCountry', this.selectedCountry);
    // ('Country Selected : ');
    // console.log(this.selectedCountry);
   this.http.get(`https://covid19.mathdro.id/api/countries/${this.selectedCountry}`).subscribe((data: any) => {
      this.countryCases = data;
      console.log('Country Cases');
      console.log(data);
      if (data.lastUpdate > localStorage.getItem('countryLastUpdated')) {
         console.log('New Case Recorded');
        //  this.notifyMe('New Cases Reported in ' + this.selectedCountry);
        // this.notifyApp('New Cases Reported in ' + this.selectedCountry);
         this.notifyApp();
       } else {
         // console.log('Nothinng has changed');
       }
      localStorage.setItem('countryLastUpdated', data.lastUpdate);
     });

}

}
