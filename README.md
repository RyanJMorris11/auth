# auth-sample

This is a basic email/password authorization backend.

step 1: download/install mongodb https://docs.mongodb.com/guides/server/install/

step 2: Create a config.js file to hold an encryption "secret" with the following configuration :

module.exports = {
secret: '8o72h3345krio8567&ug3%b4s#df3@&^tj%h\*gd4fuihdrfg',
};

WARNING: Keep your secret a SECRET. Never post it online.

step 3: Make sure Mongodb is listening to port 27017 or your local host IP

step 4: run: npm run dev

step 5: You can send requests to the API using postman to get a JWT (JSON web token).
