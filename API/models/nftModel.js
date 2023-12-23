
const mongoose =require("mongoose")
const slugify = require("slugify")
const validator = require("validator")


const nftSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, " An NFT must have a name"],
        unique: true,
        trim: true,
        maxlength: [40, "nft must have no more then 40 characters"],
        minlength: [10, "nft must have 10 characters"],
        // validate: [validator.isAlpha, "NFT name must only contain Characters"]
    }, 
    slug: String,
    duration: {
        type: String,
        require: [true, "must provide duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'must have difficulty'],
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "Difficulty is either: easy, medium and difficult"
    }   
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "must have 1"],
        max: [5, "must have 5"]
    }, 
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    summary:{
        type: String,
        trim: true,
        required: [true, 'Must provide the summary'] 
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "must provide the cover image"]
    },
    images: [String],
    createdAt:{
        type: Date, 
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    price: {
        type: Number,
        required: [true, "An NFT must have a price"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val){
                return val < this.price
            },
            message: "Discount price ({VALUE}) should be below regular price."
        }
    },
    secretNFTs:{
        type: Boolean,
        default: false
    }
},
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
    );

nftSchema.virtual("durationWeeks").get(function () {
    return this.duration / 7
})

//MOGNOOSE MIDDLEWARE

//DOCUMENT MIDDLEWARE: rus before, .save() or .create()

nftSchema.pre("save", function(next){
    console.log(this);
    this.slug = slugify(this.name, {lower: true})
    next()
})

// nftSchema.pre("save", function(next){
//     console.log("document will save...");
//     next()
// })


// nftSchema.post("save", function(doc, next){
//     console.log(doc);
//     next();
// })

//QUERY MIDDLEWARE
nftSchema.pre(/^find/, function(next){
    this.find({secretNFTs: {$ne: true}})
    this.start = Date.now()
    next()
})

// nftSchema.post(/^find/, function(doc,next){
//     console.log(`Query took time: ${Date.now() - this.start} times`);
//     console.log(doc);
//     next()
// })


//AGGREGATION MIDDLEWARE
nftSchema.pre("aggregate", function(next){
    this.pipeline().unshift({$match: {secretNFTs: {$ne: true}}})
    console.log(this.pipeline());
    next();
})

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;