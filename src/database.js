import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(db => console.log('db is connected'))
.catch(err => console.error(new Error('failed to connect to db')));