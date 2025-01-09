import http from 'k6/http'

export const options = {
    vus: 50,
    duration: '30s'
}

export default function () {
    const payload = JSON.stringify({
        name: 'lorem',
        surname: 'ipsum',
    });
    const headers = { 'Content-type': 'application/json' }
    http.post('http://httpbin.test.k6.io/post', payload, { headers })
}