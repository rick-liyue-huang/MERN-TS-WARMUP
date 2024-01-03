import mongoose, { InferSchemaType, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: String,
  },
  {
    timestamps: true,
  }
);

type NoteType = InferSchemaType<typeof noteSchema>;

export const NoteModel = mongoose.model<NoteType>('Note', noteSchema);
