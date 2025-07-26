const mongoose = require("mongoose");

const connectDatabase = () => {
    const DB_URI= process.env.DB_URL;
    if(DB_URI){
        console.log(DB_URI,"DB_URI")
        mongoose.connect(process.env.DB_URL
        //      {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     bufferCommands: false,
        //     serverSelectionTimeoutMS: 10000, // Increased timeout
        //     socketTimeoutMS: 45000,
        //     maxPoolSize: 10,
        //     family: 4 // Use IPv4, skip trying IPv6
        // }
    )
        .then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`MongoDB connection error: ${err.message}`);
            console.error('Full error:', err);
            // Try to reconnect
            // setTimeout(connectDatabase, 5000);
        });

    }else{
        console.log("MONGOOSE_URI not found")
    }

    // mongoose.connection.on('error', err => {
    //     console.error('MongoDB connection error:', err);
    //     // Try to reconnect on error
    //     setTimeout(connectDatabase, 5000);
    // });

    // mongoose.connection.on('disconnected', () => {
    //     console.log('MongoDB disconnected, trying to reconnect...');
    //     setTimeout(connectDatabase, 5000);
    // });

    // // Add connection timeout handler
    // mongoose.connection.on('timeout', () => {
    //     console.error('MongoDB connection timeout');
    //     mongoose.connection.close();
    // });
};

module.exports = connectDatabase;