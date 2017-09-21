const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const messageHandler = require('./jsonXMLResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': messageHandler.success,
  '/badrequest': messageHandler.badRequest,
  '/badRequest': messageHandler.badRequest,
  '/unauthorized': messageHandler.unauthorized,
  '/forbidden': messageHandler.forbidden,
  '/internal': messageHandler.internal,
  '/notImplemented': messageHandler.notImplemented,
  '/notimplemented': messageHandler.notImplemented,
  notFound: messageHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const type = request.headers.accept;

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, type, params);
  } else {
    urlStruct.notFound(request, response, type);
  }

  console.dir(request.url);
  console.dir(parsedUrl);
  console.dir(params);
  console.dir(request.headers.accept);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
