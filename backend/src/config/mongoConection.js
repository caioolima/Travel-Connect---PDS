import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017"); // conecta no mongo
let db = mongoose.connection 
localhost:27017

export default db; // exporta a variavel