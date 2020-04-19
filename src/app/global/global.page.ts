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


  ngAfterViewInit() {
    this.backgroundMode.enable();
    this.countries();
    if (localStorage.getItem('DefaultCountry')) {
      this.selectedCountry = localStorage.getItem('DefaultCountry');
    } else {
      this.selectedCountry = 'GH';
    }
    this.getUpdates();
    setInterval(() => this.getUpdates(), 300000);
  }


  async countries() {
    console.log('GlobalPage | countries ');
    this.http.get('https://covid19.mathdro.id/api/countries').subscribe((data: any) => {
      console.log('Countries');
      console.log(data);
      this.countriesBlock = data.countries;
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



notifyApp(msg) {
  console.log('Global Page | notifyApp()');
    // Schedule a single notification
  this.localNotifications.schedule({
      text: msg,
      // sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      sound: null
      // data: { secret: key }
    });
}


 getUpdates() {
   console.log('getUpdates()');
   console.log('getGlobalCases');
   this.http.get(this.baseUrl).subscribe((data: any) => {
      this.globalCases = data;
      localStorage.setItem('GlobalConfirmedCases', data.confirmed.value);
      console.log('Global Cases');
      console.log(data);
      if (data.confirmed.value > localStorage.getItem('GlobalConfirmedCases')) {
        // console.log('New Cases Recorded');
        // this.notifyMe('New Global Cases Reported');
        // this.notifyApp('New Global Cases Reported');
        this.notifyApp('New Global Cases Reported');
      } else {
        console.log('Nothinng has changed');
      }
      localStorage.setItem('globalLastUpdated', data.lastUpdate);
    });

   console.log('getCountryCases');
   localStorage.setItem('DefaultCountry', this.selectedCountry);
   localStorage.setItem('SelectedCountry Text', this.selectedCountry);
   console.log('Country Selected : ' + this.selectedCountry);
   this.http.get(`https://covid19.mathdro.id/api/countries/${this.selectedCountry}`).subscribe((data: any) => {
      this.countryCases = data;
      localStorage.setItem('CountryConfirmedCases', data.confirmed.value);
      console.log('Country Cases');
      console.log(data);
      if (data.confirmed.value > localStorage.getItem('CountryConfirmedCases')) {
         console.log('New Case Recorded');
         this.notifyMe('New Cases Reported in ' + this.selectedCountry);
         this.notifyApp('New Cases Reported in ' + this.selectedCountry);
       } else {
          console.log('Nothinng has changed');
       }
      localStorage.setItem('countryLastUpdated', data.lastUpdate);
     });

}

}
