import { Component } from '@angular/core';
import { AdsService } from './_services/ads.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(ads: AdsService) {
    // Call ads init - Path: "_services/ads.services.ts"
    ads.init();
  }
}
