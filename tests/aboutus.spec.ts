import { test, expect } from '@playwright/test';
import { VideoPage } from '../page/AboutPage';
import { HomePage } from '../page/HomePage';
test.describe('About Us Video Player – Full Validation', () => {

  test('Validate About Us, Start button and all video actions', async ({ page }) => {

    const videoPage = new VideoPage(page);
    const home=new HomePage(page);
    await page.goto('/');
    // Open application

    // Validate About Us link
    //await videoPage.validateAboutUsLinkVisible();

    // Open About Us modal
    await home.openAboutModal();

    // Validate modal opened
    await videoPage.validateAboutUsModalOpened();

    // Validate video is visible
    await videoPage.validateVideoVisible();

    // Validate start/play button visible
    await videoPage.validatePlayButtonVisible();

    // Click start/play button
    await videoPage.clickPlayButton();

    // Validate video is playing
    expect(await videoPage.isVideoPlaying()).toBeTruthy();

    // Validate time is increasing
    const time1 = await videoPage.getCurrentTime();
    await page.waitForTimeout(2000);
    const time2 = await videoPage.getCurrentTime();
    expect(time2).toBeGreaterThan(time1);

    // Pause video
    await videoPage.pauseVideo();
    expect(await videoPage.isVideoPaused()).toBeTruthy();

    // Play again
    await videoPage.playVideo();
    expect(await videoPage.isVideoPlaying()).toBeTruthy();

    // Forward video
    const beforeForward = await videoPage.getCurrentTime();
    await videoPage.forward(10);
    const afterForward = await videoPage.getCurrentTime();
    expect(afterForward).toBeGreaterThan(beforeForward);

    // Backward video
    await videoPage.backward(5);

    // Mute video
    await videoPage.mute();

    // Reduce volume
    await videoPage.setVolume(0.3);

    // Fullscreen
    await videoPage.fullscreen();

    // Final validation
    expect(await videoPage.isVideoPlaying()).toBeTruthy();
  });

});
