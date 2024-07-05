# Map Me: Effortlessly Discover Places Around You

Map Me backend handles the data management and API interactions necessary for the Map Me frontend application.. 🚀🐦



**The following tools were utilized for the project:**

- libraries: Morgan, nodemon, body-parser, Axios, dotenv, leaflet, JWT, Mongoose, bcryptjs, MongoDB


## Deployment Instructions:

#### Prerequisites:

- Node.js should be installed on your system.


#### Step 1: Clone the Project

Open a terminal and run the following command to clone this project:
```bash
git clone https://github.com/mhdmishab/map_me_server.git
 
```
#### Step 2: Navigate to the Project Directory of Client 

Navigate to the `server` directory within the cloned project using the command:
```bash
cd map_me_server
 
```
#### Step 3: Configure Environment Variables

Before running the backend server, make sure to create an `.env` file in the `server` directory. Add the following environment variables to the file:
```bash

MONGO_URL=
PORT=
EMAIL_ADDRESS=
EMAIL_PASSWORD=
JWT_SECRET_MAIL=
JWT_SECRET=
 
```

#### Step 4: Install Global Dependencies and nodemon

Run the following command to install nodemon globally. This will help with server restarts during development.
```bash
 yarn install
 yarn add -g nodemon
 
```
#### Step 7: Start Running the Back-end 

After navigating to the `server` directory, start the backend using the following command:
```bash
yarn dev
 
```

## Conclusion

Enjoy server...
