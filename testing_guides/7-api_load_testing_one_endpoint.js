import http from 'k6/http'

export default function () {
    const payload = JSON.stringify({
        name: 'lorem',
        surname: 'ipsum',
    });
    const headers = { 'Content-type':'application/json' }
    http.post('http://httpbin.test.k6.io/post', payload, { headers })
}