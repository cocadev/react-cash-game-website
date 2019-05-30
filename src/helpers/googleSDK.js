
export class GoogleSDK {
	constructor(videoAddEndCallback, videoAddStartCallback, contentElement, adContainer, onErrorCallBack) {
		this.adsManager = "";
		this.adsLoader = "";
		this.adDisplayContainer = "";
		this.intervalTimer = '"';
		this.playButton = "";
		this.videoContent = contentElement;

		this.iSAddVideoEnd = videoAddEndCallback;
		this.iSAddVideostart = videoAddStartCallback;
		this.isaddVideoInit = false;

		this.adContainer = adContainer;

		this.onError = onErrorCallBack;
	}

	init() {
		//this.videoContent = document.getElementById('contentElement');
		this.setUpIMA();
	}

	setUpIMA() {
		// Create the ad display container.
		this.createAdDisplayContainer();
		// Create ads loader.
		this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

		// Listen and respond to ads loaded and error events.
		this.adsLoader.addEventListener(
			google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
			(e) => {this.onAdsManagerLoaded(e);},
			false);
		this.adsLoader.addEventListener(
			google.ima.AdErrorEvent.Type.AD_ERROR,
			(e) => {this.onAdError(e);},
			false);

		// An event listener to tell the SDK that our content video
		// is completed so the SDK can play any post-roll ads.
		const contentEndedListener =  ()  => {this.adsLoader.contentComplete();};
		this.videoContent.onended = contentEndedListener;

		// Request video ads.
		const adsRequest = new google.ima.AdsRequest();
		adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
			'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
			'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
			'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

		// Specify the linear and nonlinear slot sizes. This helps the SDK to
		// select the correct creative if multiple are returned.
		adsRequest.linearAdSlotWidth = 1200;
		adsRequest.linearAdSlotHeight = 800;

		adsRequest.nonLinearAdSlotWidth = 1200;
		adsRequest.nonLinearAdSlotHeight = 800;

		this.adsLoader.requestAds(adsRequest);
	}

	createAdDisplayContainer() {
		try {
			this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer, this.videoContent);
		} catch (e) {
			throw e;
		}
	}

	playAds() {
		// Initialize the container. Must be done via a user action on mobile devices.
		this.videoContent.load();
		this.adDisplayContainer.initialize();

		try {
			// Initialize the ads manager. Ad rules playlist will start at this time.
			this.adsManager.init(screen.width, screen.height, google.ima.ViewMode.FULLSCREEN);
			this.adsManager.resize(screen.width,  screen.height, google.ima.ViewMode.FULLSCREEN);
			// Call play to start showing the ad. Single video and overlay ads will
			// start at this time; the call will be ignored for ad rules.
			this.iSAddVideostart();
			this.adsManager.start();
		} catch (adError) {
			this.onError();
			// An error may be thrown if there was a problem with the VAST response.
			this.videoContent.play();
		}
	}

	onAdsManagerLoaded(adsManagerLoadedEvent) {
		// Get the ads manager.
		const adsRenderingSettings = new google.ima.AdsRenderingSettings();
		adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
		// videoContent should be set to the content video element.
		this.adsManager = adsManagerLoadedEvent.getAdsManager(
			this.videoContent, adsRenderingSettings);

		// Add listeners to the required events.
		this.adsManager.addEventListener(
			google.ima.AdErrorEvent.Type.AD_ERROR,
			(e) => {this.onAdError(e);});
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
			(e) => {this.onContentPauseRequested(e);});
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
			(e) => {this.onContentResumeRequested(e);});
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
			(e) => {this.onAdEvent(e);});

		// Listen to any additional events, if necessary.
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.LOADED,
			(e) => {this.onAdEvent(e);});
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.STARTED,
			(e) => {this.onAdEvent(e);});
		this.adsManager.addEventListener(
			google.ima.AdEvent.Type.COMPLETE,
			(e) => {this.onAdEvent(e);});
	}


	 onAdEvent(adEvent) {
		// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
		// don't have ad object associated.
		const ad = adEvent.getAd();
		switch (adEvent.type) {
			case google.ima.AdEvent.Type.LOADED:
				// This is the first event sent for an ad - it is possible to
				// determine whether the ad is a video ad or an overlay.
				if (!ad.isLinear()) {
					// Position AdDisplayContainer correctly for overlay.
					// Use ad.width and ad.height.
					this.videoContent.play();
				}
				break;
			case google.ima.AdEvent.Type.STARTED:
				// This event indicates the ad has started - the video player
				// can adjust the UI, for example display a pause button and
				// remaining time.
				if (ad.isLinear()) {
					// For a linear ad, a timer can be started to poll for
					// the remaining time.
					this.intervalTimer = setInterval(
						() => {
							const remainingTime = this.adsManager.getRemainingTime();
						},
						300); // every 300ms
				}
				break;
			case google.ima.AdEvent.Type.COMPLETE:
				this.iSAddVideoEnd();
				// This event indicates the ad has finished - the video player
				// can perform appropriate UI actions, such as removing the timer for
				// remaining time detection.
				if (ad.isLinear()) {
					clearInterval(this.intervalTimer);
				}
				break;
		}
	}

	 onAdError(adErrorEvent) {
		 this.onError();
		 try {
			 this.adsManager.destroy();
		 }
		 catch {
			 this.onError();
		 }
	}

	onContentPauseRequested() {
		this.videoContent.pause();
		// This function is where you should setup UI for showing ads (e.g.
		// display ad timer countdown, disable seeking etc.)
		// setupUIForAds();
	}

	 onContentResumeRequested() {
		this.videoContent.play();
		// This function is where you should ensure that your UI is ready
		// to play content. It is the responsibility of the Publisher to
		// implement this function when necessary.
		// setupUIForContent();
	}
}
