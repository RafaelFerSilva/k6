import http from 'k6/http'
import { check } from 'k6'
import { Counter } from 'k6/metrics'

export const options = {
  vus: 1,
  duration: '3s'
}

const chamadas = new Counter('quantidade de chamadas')

export default function() {
  const response = http.get('http://test.k6.io')
  chamadas.add(1)
}