const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            auth: {
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
            },
            isAdmin: { type: Boolean, default: false },
            profile: {
                avatar: {
                    url: { type: String },
                },
                pseudo: { type: String },
                phone: { type: String, maxLength: 20 },
                address: { type: String },
                presentation: { type: String },
                linkFacebook: { type: String },
                linkInstagram: { type: String },
                linkTwitter: { type: String },
            }, 
        },
        { timestamps: true }
    );

    schema.plugin(uniqueValidator);

    const User = mongoose.model('user', schema);

    return User;
};