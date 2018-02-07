# Media streaming in HTML5

tags: html5, video, dash, hls, smooth-streaming, drm, clear-key, playready, widevine, fairplay, eme, mse

## HTML spec extensions
Previously, html was not capable of playing encrypted or adaptive media streams. People like Netflix desired this functionality so they proposed and standardized extensions to the HTML spec to make it possible. Everybody wins. The extensions are:

* Media source extension (MSE) - adaptive streaming support
* Encrypted module extension (EME) - drm support

At a high level, these extensions add javascript apis to the browser and `HTMLMediaElement` which enable applications to decrypt protected content and feed video chunks to the `video` element as needed. These were first rolled out in a vendor-prefixed, pre-1.0 version that was specific to each vendor implementation, but the 1.0 release normalized the API across browers.

### EME
* [Google Web Fundamentals overview](https://developers.google.com/web/fundamentals/media/eme)
* [Edge vs IE support](https://msdn.microsoft.com/en-us/library/mt598601.aspx)
* [Edge guide](https://docs.microsoft.com/en-us/microsoft-edge/dev-guide/multimedia/encrypted-media-extensions)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
* [UWP Playready](https://docs.microsoft.com/en-us/windows/uwp/audio-video-camera/playready-encrypted-media-extension)

## Adaptive streaming
Adaptive streams adjust to the network conditions; lo-fi on 3g, hi-fi on broadband. This is possible by providing many media tracks of varying qualities that are then played at the appropriate time. These tracks are listed in a "manifest" that describes the overall stream. There are several manifest formats, but they all serve this same purpose:

Name | Champion | `.ext` | content type
--- | --- | --- | ---
DASH (Dynamic adaptive streaming over HTTP) | open standard | `.mpd` | `application/dash+xml`
HLS (HTTP live streaming) | Apple | `.m3u8` | `application/mpegurl`
Smooth streaming | Microsoft | none | `application/vnd.ms-sstr+xml`

Based on the current bandwidth, the browser can determine the most appropriate track to play from the manifest, and MSE exposes a js api that makes it possible for an applicaiton to actually change a playing video to that track.

### DASH
* [`.mpd` manifest validator](http://dashif.org/conformance.html)

## DRM types
The adaptive stream manifest file also specifies how/if the content is protected by drm. Each browser uses a different drm system. A manifest can specify multiple drm types, and the client application can use the one its client supports. An open format like DASH will support most drm systems, while a proprietary format, like Smooth streaming, will likely only support playready.

Name | Champion | Browser
--- | --- | --- | ---
Clear Key | open standard specified in the EME spec | All EME compliant browsers
Widevine | Google | Chrome
Playready | Microsoft | Edge, IE
Fairplay | Apple | Safari

### Playready
* [Test license server and assets](http://test.playready.microsoft.com/Content/Content4X)
* [Edge 16 bug](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14593018/)
* [Client code samples](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/PlayReady)

Note: Edge 16 in browserstack and virtual machine report support for unprefixed software drm on playready's [tool](http://test.playready.microsoft.com/Tool/Hwdrm)

## HTML5 javascript player libraries
Name | Price | Open source
--- | --- | ---
[Bitmovin](https://bitmovin.com/video-player/) | LICENSED | No
[JW Player (full)](https://developer.jwplayer.com/) | LICENSED | No
[Azure Media Player](http://amp.azure.net/libs/amp/latest/docs/index.html) | LICENCED | No
[Viblast](http://viblast.com/player/) | Free | No
[JW Player (limited) ](https://github.com/jwplayer/jwplayer) | Free | Yes
[Google Shaka Player](https://github.com/google/shaka-player) | Free | Yes
[hasplayer.js](https://github.com/Orange-OpenSource/hasplayer.js) | Free | Yes
[dash.js](https://github.com/Dash-Industry-Forum/dash.js) | Free | Yes
[hls.js](https://github.com/video-dev/hls.js/) | Free | Yes
[video.js](https://github.com/videojs/video.js) | Free | Yes

## Live demo players
* [Playready](https://test.playready.microsoft.com/Tool/PlayerHAS)
* [Edge](https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/eme/)
* [Azure](https://ampdemo.azureedge.net/azuremediaplayer.html)
* [Bitmovin](https://bitmovin.com/mpeg-dash-hls-drm-test-player/)
* [dashif.org](http://reference.dashif.org/dash.js/nightly/samples/dash-if-reference-player/index.html)
* [shaka](https://shaka-player-demo.appspot.com/)
* [Youtube](http://yt-dash-mse-test.commondatastorage.googleapis.com/demo-player/dash-player-2018.html)

Note: All Playready samples, except Bitmovin, worked in Edge 16. Azure and Bitmovin Widevine samples worked in Chrome.
