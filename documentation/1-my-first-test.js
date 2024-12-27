// Execução de 10 interações


import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    iterations: 10,
}

export default function () {
    http.get('https://test-api.k6.io')
    sleep(1)
}