import http from 'k6/http'
import { check } from 'k6'

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: [
      {
        threshold: 'p(95) < 200', 
        abortOnFail: true, 
        delayAbortEval: '2s'
      }
    ],
    checks: ['rate > 0.99']
  }
}

export default function() {
  const response = http.get('http://test.k6.io')
  check(response, {
    'status code é 200': (res) => res.status === 200
  })
}