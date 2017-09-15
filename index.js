// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
const ParseDashboard = require('parse-dashboard');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

const IP = '10.0.0.8';

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://'+ IP + ':27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://' + IP + ':1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Parse Dashboard
const DASHBOARD_URL      = process.env.DASHBOARD_URL || '/parse-dashboard';
const DASHBOARD_USER     = process.env.DASHBOARD_USER || 'admin';
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'admin123';
if (DASHBOARD_USER) {
    const dashboard = new ParseDashboard({
        apps       : [
            {
                appName  : 'Parse Server',
                serverURL: 'http://' + IP + ':1337/parse',
                appId    : 'myAppId',
                masterKey: 'myMasterKey',
                iconName : 'icon.png'
            }
        ],
        users      : [
            {
                user: DASHBOARD_USER, // Used to log in to your Parse Dashboard
                pass: DASHBOARD_PASSWORD
            }
        ],
        iconsFolder: 'icons'
    }, true);

    // make the Parse Dashboard available at /dashboard
    app.use(DASHBOARD_URL, dashboard);
}

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

app.use(express.static('www'));

app.get('/', (req, res) => res.render('index'));

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);


