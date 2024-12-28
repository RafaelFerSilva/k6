import { check } from 'k6'
import http from 'k6/http'


// 99% das solicitações devem ser bem-sucedidas
// 99% das solicitações devem ter uma latência de 1000 ms ou menos
export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(99)<1000']
    },
}

export default function() {
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
        'response code was 200': (res) => res.status ==200
    })
}