import  mongoose  from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if(!DB_URI) {
    throw new Error("DB_URI is not defined in the environment variables DEVELOPMENT/LOCAL.");
}

const connectToDatabase = async () => {

    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to the database in ${NODE_ENV} mode`);
    }catch{
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with failure
    }

}

export default connectToDatabase;