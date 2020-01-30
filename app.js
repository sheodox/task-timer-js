const express = require('express'),
	app = express(),
	port = 3000;

app.use(express.static('./public'));

app.listen(port, () => console.log(`Todo-Timer app listening on port ${port}!`));
