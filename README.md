# parse-server-ken

![photogram](https://user-images.githubusercontent.com/8027762/30503005-70eaf5d6-9a1d-11e7-8ff4-01bf616b1295.png)

### For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm start`
* To test go to:  localhost:1337/test (make sure everything checks out)
![test](https://user-images.githubusercontent.com/8027762/30503168-180c2fc4-9a1e-11e7-9224-dd40b9dfeb0c.png)
* To see the parse-server go to: http://localhost:1337/parse-dashboard
* To run the app, http://localhost:1337
* Sign-up a user and then login
* Note:  when you want to test with your device, make sure to change the IP value in index.js and www/build/main.js

