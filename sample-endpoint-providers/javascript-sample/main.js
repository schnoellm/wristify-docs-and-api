import express from 'express'
import basicAuth from 'express-basic-auth'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());
const port = 3002;

const apiRouter = express.Router()

apiRouter.get("/endpoints", (req, res) => {

    const data = {
        endpoints: [
            {
                id: "text-sample-1",
                name: "text-sample-1",
                description: "text-sample-1"
            },
            {
                id: "text-sample-pages",
                name: "text-sample-pages",
                description: "text-sample-pages"
            },
            {
                id: "trend-sample",
                name: "trend-sample",
                description: "trend-sample"
            },
            {
                id: "image-sample",
                name: "image-sample",
                description: "image-sample"
            },
            {
                id: "action-sample",
                name: "action-sample",
                description: "action-sample"
            }
        ],
        groups: [
            {
                name: "first-group",
                endpoints: ["text-sample-1","text-sample-pages"]
            },
            {
                name: "second-group",
                endpoints:["trend-sample","image-sample","action-sample"]
            }
        ]
    }

    res.send(data);
})

apiRouter.post("/endpoints/:id", async (req, res) => {

    const endpointId = req.params.id;
    let payload = {};
    const body = req.body;


    switch (endpointId) {
        case "text-sample-1":
            payload = {
                text: "Some sample text, that can be displayed on the Wristify Garmin Widget."
            }
            break;

        case "text-sample-pages":
            payload = [{ text: "Another text based sample, that can \nalso show \nthe use of linebreaks." },
                {text: "A second page, that can be used to describe another section of text."}]
            break;

        case "trend-sample":
            payload = {
                data: [
                    {
                        name: "Line 1",
                        color: "red",
                        data: [
                            {
                                t: 1741906800,
                                y: 6
                            },
                            {
                                t: 1741993200,
                                y: 4
                            },
                            {
                                t: 1742079600,
                                y: 6
                            },
                            {
                                t: 1742166000,
                                y: 6
                            },
                            {
                                t: 1742252400,
                                y: 10
                            }
                        ]
                    },
                    {
                        name: "Line 2",
                        color: "orange",
                        data: [
                            {
                                t: 1741906800,
                                y: 3
                            },
                            {
                                t: 1741993200,
                                y: 2
                            },
                            {
                                t: 1742079600,
                                y: 3
                            },
                            {
                                t: 1742166000,
                                y: 1
                            },
                            {
                                t: 1742252400,
                                y: -4
                            }
                        ]
                    }
                ]
            };
            break;

        case "image-sample":
            payload = [
                {text: "Random image from picsum.photos"},
                {image: {
                    url: "https://picsum.photos/200/100",
                    width: 200,
                    height: 100,
                    "open-on-mobile": true
                    }
                }
            ];
            break;

        case "action-sample":

            if (body.parameter) {
                payload = { text: `received parameter:\n ${JSON.stringify(body.parameter, null, 2)}` };
            } else {
                payload = [{"text": "Select one of the following actions:"},{ actions: [{name:"first action", parameter: "first parameter", description:"description of first action"},
                    {name:"second action", parameter: {field1: "second parameter", random: Math.random()*100}, description:"description of second action"},
                    {name:"third action", parameter: ["list1","list2","list3"], description:"description of third action"}]
                }]
            }
            
            break;

        default:
            payload = null;
            break;
    }

    if (payload) {
        return res.send(payload);
    }

    res.sendStatus(404);
    return;
});

app.use(basicAuth({
    users: { "username": "password" }
}))

app.use("/api/v1", apiRouter);

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
