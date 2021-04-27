const http = require("http");
const axios = require("axios");

const srv = http.createServer(
    async (request, response) => {
        response.setHeader("Content-Type", "application/json");
        let body = [];

        if (request.method == "GET" && request.url == "/hello") {

            response.end(
                JSON.stringify({
                    message: "hello world"
                })
            );
        } else if (request.method == "POST" && request.url == "/hello") {
            request.on("data", (chunk) => {
                body.push(chunk);
            }).on("end", () => {
                body = Buffer.concat(body).toString();
                body = JSON.parse(body);

                response.end(
                    JSON.stringify({
                        message: "Hello, " + body.name
                    })
                );
            });
        } else if (request.url == "/pokemon") {
            result = {
                "pokemon": "metamorphe"
            };

            response.end( await delayedStringify(result) );

        } else {
            response.statusCode = 404;
            response.end(
                JSON.stringify({
                    error: "NOT_FOUND",
                    message: "bad route: " + request.method + " " + request.url
                })
            );
        }

    }
);

function delayedStringify(obj) {
    return new Promise((resolve, reject) => {
        if(!obj)
            reject("No object!");
        
        setTimeout(() => {
            resolve( JSON.stringify(obj) );

        }, 2000);
    })
}

srv.listen(8000, "localhost", () => {
    console.log("Server is up !");
});
