import mongoose from "mongoose";

const DB_NAME = "DevDairy";

const connectDB = async () => {
    try {
        const DB_connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        console.log(`MongoDB Connected | DB Host: ${DB_connection.connection.host} | Port: ${DB_connection.connection.port}`)

    } catch (error) {
        console.log("MongoDB Connection Error ", error)
        process.exit()
    }
}

export default connectDB;