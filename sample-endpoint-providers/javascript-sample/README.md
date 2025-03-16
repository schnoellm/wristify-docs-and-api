# Javascript sample implementation
This is a sample implementation in Javascript to show how an endpoint provider can be implemented using the API for the Wristify Garmin widget.

## How to run
1. Clone the whole repository `git clone https://github.com/schnoellm/wristify-api-and-samples.git`
2. Change the directory `cd wristify-demo/sample-endpoint-providers/javascript-sample`
3. Install dependencies `npm ci`
4. Run the sample `node main.js`
5. By default it will run on port `3002`

## How to use
Use curl to interact with the sample implementation. The Wristify Garmin Widget performs the same requests.

**List available endpoints**
- Use curl to list the available endpoints  
    `curl -X GET http://localhost:3002/api/v1/endpoints -u "username:password"`

**Call an endpoint**
- Call one of the listed endpoints (e.g. `text-sample-1`)  
    `curl -X POST http://localhost:3002/api/v1/endpoints/text-sample-1 -u "username:password"`

**Call an action endpoint**
1. First query the available actions (e.g. `action-sample`)  
    ```sh
    curl -X POST http://localhost:3002/api/v1/endpoints/action-sample -u "username:password"
    ```
2. Check the response and select a desired action. Pass the received `parameter` value in the request  
    ```sh
    curl -X POST http://localhost:3002/api/v1/endpoints/action-sample -u "username:password" -d '{"parameter":"first parameter"}' -H "Content-Type: application/json"
    ```
3. The `parameter` value can be of any type (e.g. string, JSON object, JSON array)  
    ```sh
    curl -X POST http://localhost:3002/api/v1/endpoints/action-sample -u "username:password" -d '{"parameter":{"field1":"second parameter","random":97.58451351385055}}' -H "Content-Type: application/json"
    ```

## Debug
Use **Visual Studio Code** or **Code OSS** and the configuration in `.vscode/launch.json` to debug the sample.

## Authentication
The sample uses the HTTP basic authentication to ensure user authentication.
Change the credentials accordingly and provide them in the Garmin Connect IQ app along with the actual endpoint address you are using. Make sure to use a trusted HTTPs certificate for hosting this sample.
