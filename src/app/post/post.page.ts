import { WordpressService } from '../services/wordpress.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  post: any;
  url  = '';
  whatsappUrl = '';
  id = '';
  text = 'Checkout the latest news on Coronavirus';

  constructor(private route: ActivatedRoute, private wp: WordpressService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostContent(this.id).subscribe(res => {
      this.post = res;
      // console.log('Post Page | ngOnInit() | This.post : ' + JSON.stringify(res));

      this.url = `https://coronnavirusapp.firebaseapp.com/posts/${this.id}`;
      this.whatsappUrl = `https://wa.me/?text=${this.url}`;

    });


  }



  openOriginal() {
    window.open(this.post.link, '_blank');
  }

}
