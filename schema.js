const joi=require("joi")

module.exports.productSchema = joi.object({
        title:joi.string().required(),
    description:joi.string().required(),
    price:joi.number().required().min(0),
    location:joi.string().required(),
    category:joi.string().required(),
    image:joi.string().allow("",null)
})



module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required()
})