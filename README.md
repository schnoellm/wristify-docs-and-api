# wristify-demo
This repository contains demo endpoint providers for the Wristify Garmin Widget.
The Wristify Garmin Widget uses an easy to understand and easy to use API, to access data from a custom implemented REST API endpoint.
This respository should give developers assistance in implementing a compatible rest based backend service for the Wristify app.


## API and requirements
The Wristify Garmin Widget expects the following API to be provided by a compatible endpoint provider. The endpoint provider can be hosted on an arbitrary domain and url path.
In terms of authentication and authorization, it expects HTTP basic authentication to be used.
Also make sure to use a trusted HTTPS certificate, as otherwise the Garmin IQ App will refuse to forward REST calls from the Garmin watch to the actual backend service.


### List of available endpoints
Returns the list of endpoints and the respective groups how the endpoints should be grouped on the Wristify app.
| Option | Value |
| - | - |
| URL | `https://my-custom-domain.io/arbitrary-path/endpoints` |
| Method | `GET` |
| Authentication | `Basic Authentication` |
| Response | List of endpoints and groups as JSON |

```json
{
    "endpoints": [
        {
            "id": "text-sample-1",
            "name": "text-sample-1",
            "description": "text-sample-1"
        },
        {
            "id": "text-sample-pages",
            "name": "text-sample-pages",
            "description": "text-sample-pages"
        },
        {
            "id": "trend-sample",
            "name": "trend-sample",
            "description": "trend-sample"
        },
        {
            "id": "image-sample",
            "name": "image-sample",
            "description": "image-sample"
        },
        {
            "id": "action-sample",
            "name": "action-sample",
            "description": "action-sample"
        }
    ],
    "groups": [
        {
            "name": "first-group",
            "endpoints": ["text-sample-1","text-sample-pages"]
        },
        {
            "name": "second-group",
            "endpoints":["trend-sample","image-sample","action-sample"]
        }
    ]
}
```


### Call an endpoint

Call an endpoint by it's `id` and receive one or multiple of the supported response objects. The Wristify app shows the response based on the actual response object type.
If an array of response objects is received, the Wristify app shows them in the received order and allows the user to swipe/navigate through them.

| Option | Value |
| - | - |
| URL | `https://my-custom-domain.io/arbitrary-path/endpoints/<endpoint-id>` |
| Method | `POST` |
| Authentication | `Basic Authentication` |
| Response | Any of the listed response objects or array of response objects |


**Text response**  
Shows a simple text field with the received text.
If the text is too long to be displayed on the watch display, it automatically breaks to a second page.  

```json
// single text response
{
    "text": "Some sample text, that can be displayed on the Wristify Garmin Widget."
}
```


**Trend response / Data response**  
Shows a XY/TY diagram with one or multiple lines.
An additional page on the watch app shows the legend and the time range of the shown data.

The available colors are as follows:
- `white`
- `grey`
- `dark grey`
- `black`
- `red`
- `dark red`
- `orange`
- `yellow`
- `green`
- `dark green`
- `blue`
- `dark blue`
- `purple`
- `pink`

```json
// single data response to show a trend
{
    "data": [
        {
            "name": "Line 1",
            "color": "red",
            "data": [
                {
                    "t": 1741906800,
                    "y": 6
                },
                {
                    "t": 1741993200,
                    "y": 4
                },
                {
                    "t": 1742079600,
                    "y": 6
                },
                {
                    "t": 1742166000,
                    "y": 6
                },
                {
                    "t": 1742252400,
                    "y": 10
                }
            ]
        },
        {
            "name": "Line 2",
            "color": "blue",
            "data": [
                {
                    "t": 1741906800,
                    "y": 3
                },
                {
                    "t": 1741993200,
                    "y": 2
                },
                {
                    "t": 1742079600,
                    "y": 3
                },
                {
                    "t": 1742166000,
                    "y": 1
                },
                {
                    "t": 1742252400,
                    "y": -4
                }
            ]
        }
    ]
}
```


**Image response**  
Displays an image on the watch. Optionally it also requests the Garmin Connect IQ mobile app to open it on the connected phone.
The image must be publicly accessible without any authentication, as the requested image gets proxied through Garmin servers, which convert the image to the respecitve color palette for the requesting Garmin watch model.

```json
// array of simple text response and image response
[
    {
        "text": "Random image from picsum.photos"
    },
    {
        "image": {
            "url":"https://picsum.photos/200/100",
            "width":200,
            "height":100,
            "open-on-mobile":true
        }
    }
]
```


**Actions response**  
Offers a list of selectable actions. The user can then switch through the available actions (one per page) and can trigger a desired action.
The Wristify widget calls the same endpoint, but passes the respective `parameter` value to the endpoint provider. `parameter` can be any valid JSON object, array or string value.
Based on the actual `parameter` value, the endpoint provider can decide what action to perform and what response to return. The response can then again be one of the available response objects (e.g. `text`, `data`, `image`, `actions`).

```json
// response array, which includes a sample text and an actions response object
[
    {
        "text": "Select one of the following actions:"
    },
    {
        "actions": [
            {
                "name": "first action",
                "parameter": "first parameter",
                "description": "description of first action"
            },
            {
                "name": "second action",
                "parameter": {
                    "field1": "second parameter",
                    "random": 49.98193175700383
                },
                "description": "description of second action"
            },
            {
                "name": "third action",
                "parameter": [
                    "list1",
                    "list2",
                    "list3"
                ],
                "description": "description of third action"
            }
        ]
    }
]
```


## Sample implementations

To ease the implementation of endpoint providers, this repository includes the following sample implementations:
- [Javascript](./sample-endpoint-providers/javascript-sample/README.md)


## Related projects
This project nicely plays together with the api-proxy service, which offers a frontend implementation for accessing the provided API calls. (api-proxy application is not public yet)


## Future TODOs

*OpenAPI Specification*
Eventhough the API is quite simple to implement, an OpenAPI specification file should further ease implementation and use.
