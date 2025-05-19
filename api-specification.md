# Wristify API and sample implementations
This page includes the API specification for the Wristify app for Garmin watches.
It uses an easy to understand and easy to implement API specification, to communicate with custom implemented online services.
This respository shall give developers assistance in implementing a compatible REST based online service for the Wristify app.


## API and requirements
The Wristify app expects the following API to be provided by a compatible endpoint provider. The endpoint provider can be hosted on an arbitrary domain and url path.  
In terms of authentication and authorization, it expects HTTP basic authentication to be used.  
Also make sure to use a trusted HTTPS certificate, as otherwise the Garmin IQ App will refuse to forward REST calls from the Garmin watch to the actual online service.


### List of available endpoints
Returns the list of endpoints and the groups how they are organized.
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
| Response | Any of the listed response objects or an array of response objects |


## Response objects

The following response objects might be returned on endpoint calls by the online service.

### Text response
Shows one or more pages with the received text. Number of pages depends on the length of text and wether this is supported for the actual watch model, due to memory constraints.

```json
// text response
{
    "text": "Some sample text, that can be displayed on the Wristify Garmin Widget."
}
```


### Trend response / Data response
Shows an XY/TY diagram with one or multiple lines.
An additional page on the watch app shows the legend, min/max values and the time range of the shown data.  
**Hint:** This is not supported on certain watch models, due to memory constraints.

Supported line colors:
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
// ty trend sample
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

// xy trend sample
{
    "data": [
        {
            "name": "Line 1",
            "color": "red",
            "data": [
                {
                    "x": 1,
                    "y": 2
                },
                {
                    "x": 2,
                    "y": 4
                },
                {
                    "x": 3,
                    "y": 3
                },
                {
                    "x": 4,
                    "y": 5
                },
                {
                    "x": 5,
                    "y": 4
                }
            ]
        }
    ]
}
```


### Image response
Displays an image on the watch. Optionally it also requests the Garmin Connect IQ mobile app to open it on the connected phone.
The image must be publicly accessible without any authentication, as the requested image gets proxied through Garmin servers. The Garmin servers convert the image to the respecitve color palette for the actual watch model.

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


### Actions response
Offers a list of selectable actions. The user can then switch through the available actions (one per page) and can trigger the desired action.  
The Wristify widget calls the exact same endpoint once more, but passes the respective `parameter` value to the endpoint provider.
`parameter` can be any valid JSON object, array or string value.
Based on the actual `parameter` value, the endpoint provider can then decide which action to perform and what to respond with.  
The response can then again be one of the available response objects (e.g. `text`, `data`, `image`, `actions`).

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
