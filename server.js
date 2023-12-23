const dotenv = require("dotenv")
const mongoose =require("mongoose")
const app = require("./app")
const next = require("next")

const dev = process.env.NODE_ENV !== "production";
const server = next({dev});
const handle = server.getRequestHandler();


process.on("uncaughtException", err =>{
    console.log("uncaughtException Shutting down application.");
    console.log(err.name, err.message);
    process.exit(1);

})

dotenv.config({path: "./config.env"})
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
}).then((con)=> {
    // console.log(con.connection);
    console.log("DB Connection Succesfully")
})


const port = process.env.PORT || 3000;
server.prepare().then(() => {
    
    app.get("*", (req, res) => {
        return handle(req, res);
    })

    app.listen(port, ()=> {
        console.log(`App running on port ${port}....`)
    });
})




process.on("unhandledRejection", err =>{
    console.log(err.name, err.message);
    console.log("UnhandeledRejection Shutting down application.");
    server.close(()=> {
        process.exit(1);
    })
})






// 

// const testNFT = new NFT({
//     name: "The axelel Monkey",
//     rating: 3.2,
//     price: 567
// })

// testNFT.save().then(docNFT => {
//     console.log(docNFT)
// }).catch(error => {
//     console.log("ERROR:", error)
// })


//