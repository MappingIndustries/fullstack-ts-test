To run the project:

cd server
npm i
touch .env
code .

Add the following environment variables to the `.env` file, replacing `<username>`, `<password>`, and `<port>` with your own values:

MONGO_USERNAME=<usename>
MONGO_PASSWORD=<password>
SERVER_PORT=<port>

cd client
npm i
npm start

This will start the server and client applications concurrently, allowing you to interact with the project.

Note: Make sure you have MongoDB installed and running on your machine before starting the server.
