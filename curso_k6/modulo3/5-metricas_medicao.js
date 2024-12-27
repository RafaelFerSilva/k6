import http from 'k6/http'
import { check } from 'k6'
import { Counter } from 'k6/metrics'
import { Gauge } from 'k6/metrics'

export const options = {
  vus: 1,
  duration: '3s'
}

const chamadas = new Counter('quantidade de chamadas')
const myGauge = new Gauge('Tempo bloqueado')

export default function() {
  const response = http.get('http://test.k6.io')
  chamadas.add(1)
  myGauge.add(response.timings.blocked)
}