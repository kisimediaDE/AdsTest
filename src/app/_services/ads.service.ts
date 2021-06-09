import { Injectable } from '@angular/core';
import { AdMobPlus, BannerAd, RewardedAd } from '@admob-plus/capacitor';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  adInterstitialId: string;
  adBannerId: string;

  banner: BannerAd;
  rewarded: RewardedAd;

  constructor(private platform: Platform) {
    // LOAD DEVICE adUnitId
    if (this.platform.is('android')) {
      // Example id from https://developers.google.com/admob/android/rewarded
      this.adInterstitialId = 'ca-app-pub-3940256099942544/5224354917';
      // Example id from https://developers.google.com/admob/android/banner
      this.adBannerId = 'ca-app-pub-3940256099942544/6300978111';
    } else if (this.platform.is('ios')) {
      // Example id from https://developers.google.com/admob/ios/rewarded
      this.adInterstitialId = 'ca-app-pub-3940256099942544/1712485313';
      // Example id from https://developers.google.com/admob/ios/banner
      this.adBannerId = 'ca-app-pub-3940256099942544/2934735716';
    }
  }

  public async init(): Promise<void> {
    // INIT AdMobPlus
    await AdMobPlus.start();
    // Load VideoRewardsAd
    await this.loadVideoRewardsAd();
    // Load BannerAd
    await this.loadBannerAd();
    // Load Listener for RewardAds
    this.initListener();
  }

  async loadBannerAd(): Promise<void> {
    // Create new BannerAd with id
    this.banner = new BannerAd({
      adUnitId: this.adBannerId,
      position: 'bottom'
    });
    // Display banner
    await this.banner.show();
  }

  async showBannerAd(): Promise<void> {
    // Show banner
    await this.banner.show();
  }

  async hideBannerAd(): Promise<void> {
    // Hide banner
    await this.banner.hide();
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
