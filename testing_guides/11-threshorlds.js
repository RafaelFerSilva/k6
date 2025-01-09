import { check } from 'k6';
import http from 'k6/http';

export const options = {
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
    scenarios: {
      my_scenario1: {
        executor: 'constant-arrival-rate',
        duration: '30s', // total duration
        preAllocatedVUs: 50, // to allocate runtime resources
  
        rate: 50, // number of constant iterations given `timeUnit`
        timeUnit: '1s',
      },
    },
  };

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, { headers });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === 'lorem',
  });
}