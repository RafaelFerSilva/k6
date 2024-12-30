import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  executor: 'ramping-arrival-rate',
  stages: [
    { duration: '2h', target: 20000 },
  ],
};

export default () => {
  const urlRes = http.get('https://test-api.k6.io');
  sleep(1);
  check(urlRes, {
          "response code was 200": (res) => res.status == 200
      });
};