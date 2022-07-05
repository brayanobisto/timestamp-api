// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/', function (req, res) {
  const unix = Date.now()

  res.json({
    unix,
    utc: new Date(unix).toUTCString(),
  })
})

app.get('/api/:date', function (req, res) {
  const { date } = req.params

  const unix = Number(date) || new Date(date).getTime()
  let utc = new Date(unix)

  if (utc.toString() === 'Invalid Date') {
    return res.status(400).json({ error: 'Invalid Date' })
  }

  utc = utc.toUTCString()

  res.status(200).json({ unix, utc })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
