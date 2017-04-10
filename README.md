# topbot

Node.js / Express application that serves webhook for Facebook Messenger API.


## Installing

Fork or clone the repo.

Follow the guide at [Facebook Messenger Platform - Getting Started](https://developers.facebook.com/docs/messenger-platform/quickstart). You should have a Facebook page and App set up before continuing.

Set up web access to your application. HTTPS is prefered. If you don't have a personal preference, [Heroku](https://www.heroku.com/) is well suited for quick deployment, development and experimentation.

Enter your app https address followed by ```/webhook``` in ![setup](https://scontent-amt2-1.xx.fbcdn.net/t39.2178-6/12057143_211110782612505_894181129_n.png)

Subscribe to messages and messaging_postbacks at least.
Then whatever you set as Verify Token change it accordingly in server.js
```
//server.js
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === '') {
  ...
```

Commit, push... or whatever workflow you use to deploy. Click Verify and Save, it should proceed without error.

Select your page and obtain Page Access Token
![setup](https://scontent-amt2-1.xx.fbcdn.net/t39.2178-6/12995543_1164810200226522_2093336718_n.png)

Then copy it into:
```
//fbMessengerBot/config/appToken.js
module.exports = '<ACCESS TOKEN HERE>';
```

Save, commit, deploy.
You should be up and running.
Open up your Facebook page, click messages and start conversing with the bot...


##Slash Commands

Bot provides you with the list of restaurants around the address provided

### Sample messages
```/delivery <full address>```


