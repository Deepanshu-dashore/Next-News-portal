import mongoose from "mongoose";



const connectDB = async () =>{

    const MONGODB_URI: any = process.env.MONGODB_URI;

    if(!MONGODB_URI){
        console.error("Please define the MONGODB_URI");
    }
    
    let cached = (global as any).mongoose || { conn: null, promise: null };

    if (cached.conn) {
        console.log("News DB already connected 📰");
        return cached.conn;
    };

    if (!cached.promise) {
    try{
        cached.promise = await mongoose.connect(MONGODB_URI);
        if(cached.promise){
            console.log("News DB Ready to  break some news 📰");
        }

    }catch(error){
        console.error("Error connecting to DB:", error);
        // throw error;
        process.exit(1);
    }
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;