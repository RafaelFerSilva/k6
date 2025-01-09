import http from 'k6/http'

export const options = {
    scenarios: {
        my_scenario1: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            preAllocatedVUs: 50,

            rate: 50,
            timeUnit: '1s'
        },
    },
}

export default function () {
    const payload = JSON.stringify({
        name: 'lorem',
        surname: 'ipsum',
    });
    const headers = { 'Content-type': 'application/json' }
    http.post('http://httpbin.test.k6.io/post', payload, { headers })
}