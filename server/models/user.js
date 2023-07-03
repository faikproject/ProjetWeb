const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
    const mediaSchema = mongoose.Schema({
        name: String,
        type: String,
        url: String,
        weight: Number,
    });

    var schema = mongoose.Schema(
        {
            auth: {
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
            },
            profile: {
                avatar: {
                    url: { type: String },
                },
                pseudo: { type: String },
                phone: { type: String, maxLength: 20 },
                address: { type: String },
                presentation: { type: String },
                linkTiktok: { type: String },
                linkInstagram: { type: String },
                linkFacebook: { type: String },
                linkTwitter: { type: String },
                medias: [mediaSchema],
            }, 
        },
        { timestamps: true }
    );

    schema.plugin(uniqueValidator);

    const User = mongoose.model('user', schema);

    return User;
};