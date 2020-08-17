const url = require("url");
const http = require("http");

function PostWebhook(args, callback) {
    let apiUrl = args[0];
    let data = args[1];

    const uri = apiUrl;
    let options = url.parse(uri);
    options.method = 'POST'
    options.headers = {
        accept: 'application/json',
        "content-type": 'application/json'
    };

    let request = http.request(options, function (response) {
        if (response.statusCode == 404) {
            console.log("404")
            return callback(new Error("Unexpected error"), null);
        }
        if (response.statusCode >= 400) {
            console.log("400")
            return callback(new Error("Unexpected error"), null);
        }
        let data = "";
        response.on("data", function (d) {
            data = data + d.toString();
        });

        response.on("end", function () {
            return callback(null, null);
        });
    });
    request.on("error", function (err) {
        console.log('args');
        console.log(arguments);
        callback(err);
    });
    request.write(data);
    request.end();
}
exports.PostWebhook = PostWebhook;