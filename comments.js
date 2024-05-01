// Create web server
// Run: node comments.js
// Open browser: http://localhost:3000

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = [];
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        fs.readFile('./comment.html', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (pathname == '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else if (pathname == '/getComment') {
        var comment = qs.parse(urlObj.query);
        var commentId = comment.id;
        var comment = comments[commentId];
        res.end(JSON.stringify(comment));
    } else {
        var extname = path.extname(pathname);
        var mimeType = getMimeType(extname);
        var filePath = '.' + pathname;
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': mimeType
            });
            res.end(data);
        });
    }
});
server.listen(3000, 'localhost');
