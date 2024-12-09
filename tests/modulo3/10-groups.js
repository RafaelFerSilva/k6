import http from 'k6/http'
import { check, group } from 'k6'

export const options = {
  vus: 4,
  duration: '5s',
  thresholds: {
    'http_req_duration{group:::requisição por id}': ['p(95) < 500']
  }
}

export default function () {
  group('requisição todos os crocodilos', function () {
    const response1 = http.get('http://test-api.k6.io/public/crocodiles/')
    check(response1, {
      'status code é 200 get all': (res) => res.status === 200
    })
  })


  group('requisição por id', function () {
    const response2 = http.get('http://test-api.k6.io/public/crocodiles/1/')
    check(response2, {
      'status code é 200 get id': (res) => res.status === 200
    })
  })

}