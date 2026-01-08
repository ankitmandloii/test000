const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String,required: true },
    descriptionTask: {type: String, required: true},
    taskCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true}
});

 module.exports = mongoose.model('Task', taskSchema);

