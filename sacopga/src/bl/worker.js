const { parentPort, workerData } = require('worker_threads')

/* con lo sharedbuffer condividiamo la memoria con il main */
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100)
const world = new Int32Array(sharedBuffer)
let step = 1
const { mondo } = workerData

parentPort.on('message', () => {
    console.log(`--- SIMULA SU MONDO ${mondo} INIZIO`)
    parentPort.postMessage('CIAO DALL\'INIZIO DI simula su  ' + mondo)

    initWorld(mondo)
    parentPort.postMessage({mondo, world })
    setInterval(() => {
      for (let i = 0; i < 1000; i++) {
        const i = Math.round(Math.random() * 10)
        const j = Math.round(Math.random() * 10)
        let val = worldVal(mondo, i, j)+step
        setWorld(mondo, i, j, val)
        if(val > 1000000){
          // AL primo valore oltre 1000000 comincio
          // a ricalare finchè non torno a 0
          step = -1
        }
        if(val <= 0){
          // AL primo valore zero (negativo è per sicurezza) ricomincio a crescere
          step = 1
        }
      }
      console.log(`ESEGUITO ${mondo} BLOCCO`)
    }, 450)
  }
)

function worldVal (idworld, i, j) {
  return world[i + 10 * j]
}

function setWorld (idworld, i, j, val) {
  world[i + 10 * j] = val
}

function initWorld (idworld) {
  for (let i = 0; i < 101; i++) {
    world[i] = 0
  }
  return world
}

//simula()
