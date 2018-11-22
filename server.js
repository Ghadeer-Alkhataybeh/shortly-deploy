var app = require('./server-config.js');

var port = process.env.PORT || 4568; // here we had to change the port it was only 4568

app.listen(port);

console.log('Server now listening on port ' + port);
