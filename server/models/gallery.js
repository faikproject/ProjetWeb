const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = (mongoose) => {
    const mediaSchema = mongoose.Schema({
        name: String,
        type: String,
        url: String,
        weight: Number,
    });

    var schema = mongoose.Schema(
        {
            name: { type: String, required: true}, 
            description: {type: String},
            medias: [mediaSchema],
            
        },
        { timestamps: true }
    );

    schema.plugin(mongoosePaginate);

    const Gallery = mongoose.model('gallery', schema);

    return Gallery;
};