var ex = require('express');
var path = require('path');
var cors = require('cors');

var app = ex();

app.use(cors());

app.use(ex.static(path.join(__dirname, '/public')));

app.get('/api/mystery', function (req, res) {

res.writeHead(200, { 'Content-Type': 'application/json' });

var data = { "people": [{"Name": "Keni" },{"Name": "Rich" }, {"Name": "Len" }, {"Name": "Ben" }, {"Name": "Bredler" }, 
{"Name": "Mario" }, {"Name": "Justin" }, {"Name": "Alex" }, {"Name": "Kevin" }  ]
	};

res.end(JSON.stringify(data));
	
});

app.get('/api/hello', function (req, res) {

res.writeHead(200, { 'Content-Type': 'application/json' });

res.json({msg: "Hello World"});
	
});

//process.env.port is for azure deployment
app.listen(process.env.PORT || parseInt(process.argv[2])  || 1337);