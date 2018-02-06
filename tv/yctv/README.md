# Yahoo Connected TV (YCTV)

tags: yahoo, tv, smart-tv

Yahoo's smart tv platform has been implemented by several tv manufacturers, including Vizio.

See the YCTV docs for a general overview:
* [Overview](https://developer.yahoo.com/connectedtv/devguide/CTV_DG_Review_the_Sample_TV_App_Files.html)
* [Testing on Device](https://developer.yahoo.com/connectedtv/installguide/CTV_IG_Testing_on_a_Consumer_Device.html)

## Test on device
For testing on devices, widgets are uploaded to the yahoo network and then downloaded to devices with a special pin code. Follow these steps:
1. On TV, open app store and go to Settings > Developer Settings to get pin code
1. Go to `https://tv.widgets.yahoo.com/publisher/`
1. Sign in to yahoo account
1. Upload widget
1. In "My TV Apps", right click app and add tester, using pin code from tv
1. Back in tv store developer settings, select "Show My Test Apps" and sign in to the yahoo account that you added as a tester
1. Go to app store and go to Categories > Test Apps to select your app
If you activate test apps before adding the pin as a tester, the test apps section will not appear in the store. If this happens, reset the tv to retry the process.
