import { Notification } from './../../models/notification';
import SQLite from 'react-native-sqlite-storage';

const globalAny: any = global;

export const insertNotification = (notification: Notification) => {
    SQLite.enablePromise(true);
    // let db = SQLite.openDatabase({ name: 'db.db', location: 'default', createFromLocation: '~www/db.db' });
    globalAny.db.transaction((trans: any) => {
        trans.executeSql(
            'INSERT INTO notification (title, body, image_url, created_at) VALUES(?, ?, ?, ?)',
            [notification.title, notification.body, notification.image_url, notification.created_at],
            (tx: any, results: any) => {console.log(results);},
            (error: any) => {console.log(error);}
    );});
    // globalAny.db.executeSql(
    //     'INSERT INTO notification (title, body, image_url, created_at) VALUES(?, ?, ?, ?)',
    //     [notification.title, notification.body, notification.image_url, notification.created_at],
    //     (tx: any, results: any) => {console.log(results);},
    //     (error: any) => {console.log(error)}
    // );
};

export const fetchAllNotification = async () => {
    let result = [];
    SQLite.enablePromise(true);
    await globalAny.db.transaction((trans: any) => {
        trans.executeSql(
            'SELECT * FROM notification',
            [],
            (tx: any, results: any) => {
                for (let i = 0; i < results.rows.length; i++) {
                    result.push(results.rows.item(i));
                }
            },
            (error: any) => {console.log(error);}
    );});
    return result;
};
