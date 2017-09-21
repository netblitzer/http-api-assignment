const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object.message);
  response.end();
};

const success = (request, response, type) => {
  const responseBack = { };

  if (type === 'text/xml') {
    responseBack.message = '<response>\n<message>This is a successful response</message>\n</response>';

    return respondXML(request, response, 200, responseBack);
  }
  responseBack.message = 'This is a successful response';

  return respondJSON(request, response, 200, responseBack);
};

const forbidden = (request, response, type) => {
  const responseBack = { };

  if (type === 'text/xml') {
    responseBack.message = '<response>\n';
    responseBack.message += '<id>forbidden</id>\n';
    responseBack.message += '<message>You do not have access to this content</message>\n';
    responseBack.message += '</response>';

    return respondXML(request, response, 403, responseBack);
  }
  responseBack.id = 'forbidden';
  responseBack.message = 'You do not have access to this content';

  return respondJSON(request, response, 403, responseBack);
};

const internal = (request, response, type) => {
  const responseBack = { };

  if (type === 'text/xml') {
    responseBack.message = '<response>\n';
    responseBack.message += '<id>internalError</id>\n';
    responseBack.message += '<message>Internal Server Error. Something went wrong.</message>\n';
    responseBack.message += '</response>';

    return respondXML(request, response, 403, responseBack);
  }
  responseBack.id = 'internalError';
  responseBack.message = 'Internal Server Error. Something went wrong.';

  return respondJSON(request, response, 403, responseBack);
};

const notImplemented = (request, response, type) => {
  const responseBack = { };

  if (type === 'text/xml') {
    responseBack.message = '<response>\n';
    responseBack.message += '<id>notImplemented</id>\n';
    responseBack.message += '<message>A get request for this page has not been implemented yet. Check again later for updated content.</message>\n';
    responseBack.message += '</response>';

    return respondXML(request, response, 501, responseBack);
  }
  responseBack.id = 'forbidden';
  responseBack.message = 'A get request for this page has not been implemented yet. Check again later for updated content.';

  return respondJSON(request, response, 501, responseBack);
};

const badRequest = (request, response, type, params) => {
  const responseBack = { };

  if (!params.valid || params.valid !== 'true') {
    if (type === 'text/xml') {
      responseBack.message = '<response>\n';
      responseBack.message += '<id>badRequest</id>\n';
      responseBack.message += '<message>Missing valid query params set to true</message>\n';
      responseBack.message += '</response>';

      return respondXML(request, response, 400, responseBack);
    }
    responseBack.message = 'Missing valid query params set to true';
    responseBack.id = 'badRequest';

    return respondJSON(request, response, 400, responseBack);
  }
  if (type === 'text/xml') {
    responseBack.message = '<response>\n<message>This is a successful response</message>\n</response>';

    return respondXML(request, response, 200, responseBack);
  }
  responseBack.message = 'This is a successful response';

  return respondJSON(request, response, 200, responseBack);
};

const unauthorized = (request, response, type, params) => {
  const responseBack = { };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    if (type === 'text/xml') {
      responseBack.message = '<response>\n';
      responseBack.message += '<id>unauthorized</id>\n';
      responseBack.message += '<message>Missing loggedIn query parameter set to yes</message>\n';
      responseBack.message += '</response>';

      return respondXML(request, response, 401, responseBack);
    }
    responseBack.message = 'Missing loggedIn query parameter set to yes';
    responseBack.id = 'unauthorized';

    return respondJSON(request, response, 401, responseBack);
  }
  if (type === 'text/xml') {
    responseBack.message = '<response>\n<message>This is a successful response</message>\n</response>';

    return respondXML(request, response, 200, responseBack);
  }
  responseBack.message = 'This is a successful response';

  return respondJSON(request, response, 200, responseBack);
};

const notFound = (request, response, type) => {
  const responseBack = { };

  if (type === 'text/xml') {
    responseBack.message = '<response>\n';
    responseBack.message += '<id>notFound</id>\n';
    responseBack.message += '<message>The page you are looking for was not found.</message>\n';
    responseBack.message += '</response>';

    return respondXML(request, response, 404, responseBack);
  }
  responseBack.id = 'notFound';
  responseBack.message = 'The page you are looking for was not found.';

  return respondJSON(request, response, 404, responseBack);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
