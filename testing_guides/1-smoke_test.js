import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: 3,
    duration: '1m'
}

export default () => {
    const urlRes = http.get('https://test-api.k6.io')
    sleep(1)
    check(urlRes, {
        "response code was 200": (res) => res.status == 200
    });
}