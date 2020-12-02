module.exports = (request, response, next) => {
    response.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    });
  
    
    if (request.method === 'OPTIONS') {
      response.sendStatus(200);
    } else {
      next();
    }
  };
