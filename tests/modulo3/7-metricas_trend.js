import http from 'k6/http'
import { check } from 'k6'
import { Counter } from 'k6/metrics'
import { Gauge } from 'k6/metrics'
import { Rate } from 'k6/metrics'
import { Trend } from 'k6/metrics'

export const options = {
  vus: 1,
  duration: '3s'
}

const chamadas = new Counter('quantidade de chamadas')
const myGauge = new Gauge('Tempo bloqueado')
const myrate = new Rate('taxa req 200')
const myTrend = new Trend('Taxa de espera')

export default function() {
  const response = http.get('http://test.k6.io')
  // contador
  chamadas.add(1)
  // medidor
  myGauge.add(response.timings.blocked)
  // Taxa
  myrate.add(response.status === 200)
  // tendência
  myTrend.add(response.timings.waiting)
}