import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    stages: [
        { duration: '2m', target: 2000 },
        { duration: '1m', target: 0 }
    ]
}

export default () => {
    const urlRes = http.get('https://test-api.k6.io')
    sleep(1)
    check(urlRes, {
        "response code was 200": (res) => res.status == 200
    });
}