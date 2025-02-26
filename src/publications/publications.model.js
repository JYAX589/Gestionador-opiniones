import { Schema, model } from "mongoose";

const CommentSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'user id is required.']
        },
        content:{
            type: String,
            required: [true, 'Content is required.']
        }
    }
);

const PublicationSchema = Schema(
    {
        title:{
            type:String,
            required: [true, 'Title is required.'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters.']
        },
        category:{
            type: String,
            required: [true, 'category is required.']
        },
        content:{
            type: String,
            required: [true, 'Content is required.']
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'user id is required.']
        },
        comments: [CommentSchema],
    }
);


export default model('Publication', PublicationSchema);