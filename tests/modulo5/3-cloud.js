import http from 'k6/http'
import { check, sleep } from 'k6'
import { SharedArray } from 'k6/data'

export const options = {
    stages: [
        { duration: '10s', target: 10},
        { duration: '10s', target: 10},
        { duration: '10s', target: 0}
    ],
    thresholds: {
        checks: ['rate > 0.95'],    
        http_req_duration: ['p(95) < 200']
    },
    ext:{
        loadimpact: {
            projectID: '3732463',
            name: 'POC CURSO K6'
        }
    }
}

const data = new SharedArray('Leitura de json', function(){
    return JSON.parse(open('dados.json')).crocodilos
})

export default function() {
    const crocodilo = data[Math.floor(Math.random() * data.length)].id
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;
    const res = http.get(BASE_URL)
    check(res, {
        'status code 200': (r) => r.status === 200
    })
    sleep(1)
}