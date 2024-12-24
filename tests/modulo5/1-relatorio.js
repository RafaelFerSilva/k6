import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '10s', target: 10},
    ],
    thresholds: {
        checks: ['rate > 0.95'],    
        http_req_failed: ['rate > 0.01'],
        http_req_duration: ['p(95) < 500']
    }
}


export default function() {
    const BASE_URL = `https://test-api.k6.io`;
    const user = `${Math.random()}@mail.com`
    const pass = 'user123'

    console.log(user +" "+ pass)

    const response = http.post(`${BASE_URL}/user/register/`, {
        username: user,
        first_name: 'crocodilo',
        last_name: 'dino',
        email: user,
        password: pass
    })

    check(response, {
        'sucesso ao registrar': (r) => r.status === 201
    })

    sleep(1)
}

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }