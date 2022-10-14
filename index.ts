import express from "express";
import App from "./services/ExpressApi";
import dbConnection from "./services/Database";


const startServer =async () => {
    const app = express();

    await dbConnection();
    await App(app);
    
    app.listen(8000, () => {
        console.log('App is listening to the port 8000.')
    })
}

startServer();

 
