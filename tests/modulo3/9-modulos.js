
// default
import http from 'k6/http'
import { check } from 'k6'

// remotos
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function() {
  const response = http.get('http://test.k6.io')
  check(response, {
    'status code é 200': (res) => res.status === 200
  })
}