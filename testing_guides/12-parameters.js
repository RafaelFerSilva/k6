import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users.json', function () {
  return JSON.parse(open('./12-users.json')).users;
});

export const options = {};

export default function () {
  // now, user data is not the same for all the iterations
  const user = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    name: user.username,
    surname: user.surname,
  });

  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, {
    headers,
  });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === user.username,
  });
}