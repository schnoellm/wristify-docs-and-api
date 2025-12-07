# Wristify
A widget for garmin watches to access custom online services through an easy to implement REST API.

## What it is
Wristify is a app/widget for garmin watches and can be downloaded in the [Garmin Store](https://apps.garmin.com/apps/9544f08e-9bbd-4252-8b81-e2ff9bd21c52)
It can be installed on supported garmin watches and allows the user to access custom implemented APIs directly from their garmin smart watch.

### Possible use cases
Possible use cases for Writisfy include:
- Retrieving the shipment status of a parcel
- Requesting the current weather report and forecast
- Checking out gas prices and find the cheapest gas station
- Trigger custom actions for your home automation
- Display current news interpreted from an RSS feed
- Show current webcam images (e.g. for checking weather conditions in the mountains)

The list of use cases is literally endless, as any custom logic can be implemented in the online service and any custom actions may be triggered.

## How does it work
Wristify works in the following way:
- The app needs an appropriate online service, which is implemented by the user and provides a REST API following a certain [API specification](api-specification.md).
- This online services can be implemented with the help of any programming language, framework or software application.
- The online service can implement any custom logic the user want to offer for the garmin app to be accessible.
- In order for the app to access the functionality of the online service, the app requires an active network connection to the online service.

## Requirements
Wristify needs the following prerequisites:
- Online service that is hosted somewhere accessible and offers the required REST API implementation
- The online service needs to use a trusted HTTPS certificate in order that the watch trusts the communication
- Active network connection to the online service

# Features
Wristify can handle the following responses to be displayed and interacted with:
- Regular text responses to be displayed on the watch
- XY, TY charts and bar charts to be displayed (incl. legend)
- Images to be displayed on the watch or opened on the smartphone
- Custom action responses to select from and trigger custom actions on the online service

These responses can be access by calling individual endpoints directly from the watch. One or multiple of these responses can be returned by the online service and the watch app will handle them accordingly.
Furthermore the individual endpoints can organized in groups.

## Limited functionality on watch models
Depending on the actual watch model and the available system memory of that particular model, features like the "XY/TY/bar charts" and the display of imagesare disabled due to limited system memory. This affects the following models:
- Vivoactive 3
- Venu Square
- Forerunner 55, 245, 645, 935
- Fenix 5, 5s, 6, 6s, chronos
- Instinct crossover, 2, 2s, 2x

# Configuration and usage
1. Once you have installed the Wristify app, open the Garmin Connect IQ app on your smartphone and navigate to the app settings.

2. You will find the following settings:
    | Setting | Description | Example |
    | - | - | - |
    | Endpoint url | URL of your online service to connect to | e.g. `https://universal-pollen-helenium.glitch.me/api/v1/endpoints` |
    | Username | username to access the online service (Basic Authentication scheme) | e.g. `secret-user` |
    | Password | password to access the online service (Basic Authentication scheme) | e.g. `secret-password1` |
    | Device Id | Device identifier, required for the appropriate license key | e.g. `a:58ab8e240906b01db52301d78efe4acfdc5a814a` |
    | License Key | License key to be used by the app; can be left empty for trial mode | e.g. `jF9KLA+rkc9dKO1dmQn6FCSj2f8dbTZflGUeSecGFg+4JXijBoBvbV2BSgrOexGVyznrlI8308hu3y31YQHqRjow4OXzr8RfNDuCOvZrXyx5rfVuBFnJKJau9+36zV+y` |

3. Provide the respective settings and save
4. Reopen the Wristify app on your watch
5. The app will immediately try to connect to the configured online service
6. A response text/code will report the success
7. If successful, use the menu button of the watch to open up the list of endpoints
8. Navigate through the list of groups and endpoints by means of physical buttons or touch.
9. Select the desired endpoint and wait for the online service to respond
10. Once done, you can leave the app with the "back" button or "back" gesture, or wait till the widget times out and gets closed by the watch automatically.

## Trial mode and License key
The Wristify app requires a license key to provide all the features and to not be restricted in the count of usable endpoints and response objects.

If run in Trial mode, the available endpoints are limited to a maximum of 2 groups and 3 endpoints each, randomly chosen at every start. Also the response objects of the endpoints is limited to a single randomly chosen object which each call.

You are welcomed to run the app in trial mode or reach out to obtain an license key.
You will find the required device identifier in the Garmin Connect IQ app, when you open the app settings.
Contact me together with the identifier and a short description of your automation ideas and I will be happy to provide you with a license key.

*Especially in the initial phase I'm happy to provide license keys for free, as I don't know yet how the whole project turns out.*

# Implementation and technical stuff
Wristify requires an online service to function properly and to provide the desired functionality.  
That online service can be implemented with the help any programming language or framework you choose.

The [API specification](./api-specification.md) is kept quite easy to follow, which should allow easy adoption.

**Sample implementation:**  
See [javascript sample implementation](https://github.com/schnoellm/wristify-javascript-sample) for a sample implementation implemented in javascript.  
Which the help of [glitch.com](glitch.com), it can even be temporarily hosted for a quick and easy start.

**Long term usage**  
Make sure to choose an appropriate hosting mechanism in the long run and ensure to utilize a trusted HTTPS certificate for the service itself.

## API specification
The necessary API specification can be found here: [API specification](./api-specification.md)
