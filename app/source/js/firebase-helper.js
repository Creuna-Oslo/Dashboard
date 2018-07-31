import * as firebase from 'firebase/app';
import 'firebase/database';

import firebaseInit from '../../../firebase-init.json';
import firebaseToArray from './firebase-to-array';

firebase.initializeApp(firebaseInit);
const database = firebase.database();

const onNotification = callback => {
  database
    .ref('notifications')
    .orderByChild('time')
    .limitToFirst(20)
    .on('value', snapshot => {
      callback(firebaseToArray(snapshot));
    });
};

module.exports = {
  onNotification
};
