// Inicialização
import sleep from 'k6';


// Configuração
export const option = {
  vus: 1,
  duration: '10s'
}


// Execução
export default function() {
  console.log('Test k6')
  sleep(1)
}


// Desmontagem
export function teardown(data) {
  console.log(data)
}