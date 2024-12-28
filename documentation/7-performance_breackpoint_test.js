import { check } from 'k6'
import http from 'k6/http'


// 99% das solicitações devem ser bem-sucedidas
// 99% das solicitações devem ter uma latência de 1000 ms ou menos
export const options = {
    thresholds: {
        http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
        http_req_duration: ['p(99)<1000']
    },

    scenarios: {
        breaking: {
            executor: 'ramping-vus',
            stages: [
                { duration: '10s', target: 20 },
                { duration: '50s', target: 20 },
                { duration: '50s', target: 40 },
                { duration: '50s', target: 60 },
                { duration: '50s', target: 80 },
                { duration: '50s', target: 100 },
                { duration: '50s', target: 120 },
                { duration: '50s', target: 140 },
            ],
        }
    }
}



export default function () {
    const url = 'https://test-api.k6.io/auth/basic/login/'
    const payload = JSON.stringify({
        username: 'test_case',
        password: '1234'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'response code was 200': (res) => res.status == 200
    })
}