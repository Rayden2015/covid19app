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

  constructor(private route: ActivatedRoute, private wp: WordpressService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await loading.present();
    const id = this.route.snapshot.paramMap.get('id');
    this.wp.getPostContent(id).subscribe(res => {
      this.post = res;
      //console.log('Post Page | ngOnInit() | This.post : ' + JSON.stringify(res));

      loading.dismiss();
    });


  }



  openOriginal() {
    window.open(this.post.link, '_blank');
  }

  // share(message,subject, file, url){
  //   this.social.share(message, subject,file,url).then(() => {
  //     // Success!
  //   }).catch(() => {
  //     // Error!
  //   });
  // }

}
