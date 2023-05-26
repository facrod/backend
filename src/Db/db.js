import mongoose from "mongoose";

mongoose.set("strictQuery")

function connect () {
    mongoose.connect(process.env.DB_CONNECTION)
    .then((res) => console.log("Db conectada"))
    .catch((err) => console.log(err))    
}

export default connect