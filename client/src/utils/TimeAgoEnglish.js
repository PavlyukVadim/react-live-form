import javascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locales/en';
import 'javascript-time-ago/intl-messageformat-global';
import 'intl-messageformat/dist/locale-data/en';

javascriptTimeAgo.locale(en);
const timeAgoEnglish = new javascriptTimeAgo('en-US');

export default timeAgoEnglish;
