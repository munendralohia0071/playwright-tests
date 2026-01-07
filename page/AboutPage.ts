import { Page, Locator } from '@playwright/test';

export class VideoPage {
  readonly page: Page;
  readonly aboutUsLink: Locator;
  readonly aboutUsModal: Locator;
  readonly playButton: Locator;
  readonly video: Locator;

  constructor(page: Page) {
    this.page = page;

    // ✅ Initialize locators AFTER page is assigned
    this.aboutUsLink = page.locator('text=About us');
    this.aboutUsModal = page.locator('#videoModal');
    this.playButton = page.locator('button.vjs-big-play-button');
    this.video = page.locator('video');
  }

  async validateAboutUsLinkVisible() {
    await this.aboutUsLink.waitFor({ state: 'visible' });
  }

  async openAboutUsModal() {
    await this.aboutUsLink.click();
  }

  async validateAboutUsModalOpened() {
    await this.aboutUsModal.waitFor({ state: 'visible' });
  }

  async validateVideoVisible() {
    await this.video.waitFor({ state: 'visible' });
  }

  async validatePlayButtonVisible() {
    await this.playButton.waitFor({ state: 'visible' });
  }

  async clickPlayButton() {
    await this.playButton.click();
  }

  // (rest of methods stay SAME)
  async isVideoPlaying(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return false;
      const v = video as HTMLVideoElement;
      return !v.paused && v.currentTime > 0;
    });
  }

  // ⏸ Pause
  async pauseVideo() {
    await this.page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return;
      (video as HTMLVideoElement).pause();
    });
  }

  // ⏸ Paused validation
  async isVideoPaused(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return false;
      return (video as HTMLVideoElement).paused;
    });
  }
  async playVideo() {
    await this.page.evaluate(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      video.play();
    });
  }

  // ⏩ Forward
  async forward(seconds: number) {
    await this.page.evaluate((sec) => {
      const video = document.querySelector('video');
      if (!video) return;
      (video as HTMLVideoElement).currentTime += sec;
    }, seconds);
  }

  // ⏪ Backward
  async backward(seconds: number) {
    await this.page.evaluate((sec) => {
      const video = document.querySelector('video');
      if (!video) return;
      (video as HTMLVideoElement).currentTime -= sec;
    }, seconds);
  }

  // 🔇 Mute
  async mute() {
    await this.page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return;
      (video as HTMLVideoElement).muted = true;
    });
  }

  // 🔊 Volume
  async setVolume(volume: number) {
    await this.page.evaluate((vol) => {
      const video = document.querySelector('video');
      if (!video) return;
      (video as HTMLVideoElement).volume = vol;
    }, volume);
  }

  // 🔳 Fullscreen (SAFE)
  async fullscreen() {
    await this.page.evaluate(() => {
      const video = document.querySelector('video') as any;
      if (video && video.requestFullscreen) {
        video.requestFullscreen();
      }
    });
  }

  // ⏱ Time
  async getCurrentTime(): Promise<number> {
    return await this.page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return 0;
      return (video as HTMLVideoElement).currentTime;
    });
  }

}
