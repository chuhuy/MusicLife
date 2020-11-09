import { Notification } from './../../models/notification';

const globalAny: any = global;

export const insertNotification = async (notification: Notification) => {
    // let db = await SQLite.openDatabase({ name: 'db.db', location: 'default', createFromLocation: '~www/db.db' });
    globalAny.db.transaction((trans: any) => {
        console.log('Prepare');
        trans.executeSql('INSERT INTO notification (title, body, image_url, created_at) VALUES(?, ?, ?, ?)',
        [notification.title, notification.body, notification.image_url, notification.created_at],
        (tx: any, results: any) => {console.log('Success'); console.log(results);});
    });
};
