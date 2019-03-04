import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
