import express from 'express';
import { configuration } from './config/config';
import './database';

const app = configuration(express());

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});