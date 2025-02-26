import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const CategorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre de la categoría es obligatorio'],
            unique: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Category', CategorySchema);