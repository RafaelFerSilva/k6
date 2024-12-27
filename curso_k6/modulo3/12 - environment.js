import http from 'k6/http'
import { sleep, sllep } from 'k6'

export default function() {
  const BASE_URL = __ENV.URL
  const response = http.get(BASE_URL)
  sleep(1)
}