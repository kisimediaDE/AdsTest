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
    this.initListener();
  }

  public async showVideoRewardsAd(): Promise<void> {
    // Display rewarded
    await this.rewarded.show();

    // Trying to get rewared from RewaredAd
    // Error: Property 'reward' does not exist on type 'RewardedAd'
    /* *** CODE 2 START ***
    const test = this.rewarded.reward;
    *** CODE 2 END *** */
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
    // Trying to get reward with AdMobPlus.addEventListener
    // Error: Property 'addEventListener' does not exist on type 'AdMobPlusPlugin'.
    /* *** CODE 1 START ***
    AdMobPlus.addEventListener('rewarded.reward', (reward) => {
      console.log(reward);
    });
    *** CODE 1 END *** */

    // Trying different types of document.addEventListener
    // None of this is fired
    /* *** CODE 3 START *** */
    document.addEventListener('AdMobPlus.rewared.reward', (reward) => {
      console.log('Reward 1');
      console.log(reward);
    });
    document.addEventListener('AdMobPlus.rewared.dismiss', () => {
      console.log('Dismiss 1');
    });
    document.addEventListener('admobplus.rewared.reward', (reward) => {
      console.log('Reward 2');
      console.log(reward);
    });
    document.addEventListener('admobplus.rewared.dismiss', () => {
      console.log('Dismiss 2');
    });
    document.addEventListener('admob.rewarded.reward', (reward) => {
      console.log('Reward 3');
      console.log(reward);
    });
    document.addEventListener('admob.rewarded.dismiss', () => {
      console.log('Dismiss 3');
    });
    /* *** CODE 3 END *** */

    /* *** CODE 4 START */
    // THIS PART IS WORKING ON ANDROID BUT NOT ON IOS!!
    document.addEventListener('rewarded.reward', (reward) => {
      console.log('Reward 4');
      console.log(JSON.stringify(reward));
    });
    document.addEventListener('rewarded.dismiss', () => {
      console.log('Dismiss 4');
    });
    /* *** CODE 4 END */
  }
}
