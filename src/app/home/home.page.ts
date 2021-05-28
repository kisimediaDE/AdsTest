import { Component } from '@angular/core';
import { AdsService } from '../_services/ads.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(public ads: AdsService) {}
}
