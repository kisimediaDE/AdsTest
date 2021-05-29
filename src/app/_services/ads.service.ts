import { Injectable } from '@angular/core';
import { AdMobPlus, RewardedAd } from '@admob-plus/capacitor';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  adInterstitialId: string;
  rewarded: RewardedAd;

  constructor(private platform: Platform) {
    // LOAD DEVICE adUnitId
    if (this.platform.is('android')) {
      // Example id from https://developers.google.com/admob/android/rewarded
      this.adInterstitialId = 'ca-app-pub-3940256099942544/5224354917';
    } else if (this.platform.is('ios')) {
      // Example id from https://developers.google.com/admob/ios/rewarded
      this.adInterstitialId = 'ca-app-pub-3940256099942544/1712485313';
    }
  }

  public async init(): Promise<void> {
    // INIT AdMobPlus
    await AdMobPlus.start();
    // Load VideoRewardsAd
    await this.loadVideoRewardsAd();
    // Load Listener for RewardAds
    this.initListener();
  }

  public async showVideoRewardsAd(): Promise<void> {
    // Display rewarded
    await this.rewarded.show();
  }

  private async loadVideoRewardsAd(): Promise<void> {
    // Create new RewaredAd with id
    this.rewarded = new RewardedAd({
      adUnitId: this.adInterstitialId
    });
    // Load rewarded
    await this.rewarded.load();
  }

  private initListener() {
    // Get reward
    AdMobPlus.addListener('rewarded.reward', (reward) => {
      console.log('Reward');
      console.log(reward);
    });
    // Get dismiss
    AdMobPlus.addListener('rewarded.dismiss', () => {
      console.log('Dismiss');
    });
  }
}
