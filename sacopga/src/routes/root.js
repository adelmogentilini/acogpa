'use strict'
const path = require('path')
const { Worker } = require('worker_threads')
const poolworld = []

// async function initWorld (idworld, sharedbuffer) {
//   const world = new Int32Array(sharedbuffer)
//   for (let i = 0; i < 101; i++) {
//     world[i] = 0
//   }
//   poolworld[idworld] = world
//   return world
// }

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { sacopga: 'SimulAted ComPlex enGine for A world' }
  })

  // fra i parametri di query deve esserci il nome del mondo
  fastify.route({
    method: 'GET',
    url: '/situazione',
    schema: {
      querystring: {
        type: 'object',
        required: ['mondo'],
        properties: {
          mondo: { type: 'string' },
        }
      }

    },
    handler: async function (request, reply) {
      if (poolworld[request.query.mondo]) {
        return JSON.stringify(poolworld[request.query.mondo], function(k, v) {
          if (v instanceof  Int32Array) {
            return Array.apply([], v);
          }
          return v;
        });
      } else {
        return 'MONDO NON ANCORA PARTITO'
      }
    }
  })

  // Elenca i mondi attualmente attivi
  fastify.route({
    method: 'GET',
    url: '/list',
    handler: async function (request, reply) {

      if (Object.keys(poolworld).length > 0) {
        return {"mondi": Object.keys(poolworld)}
      } else {
        return []
      }
    }
  })

  // fra i parametri di query deve esserci il nome del mondo
  fastify.route({
    method: 'GET',
    url: '/start',
    schema: {
      querystring: {
        type: 'object',
        required: ['mondo'],
        properties: {
          mondo: { type: 'string' },
        }
      }
    },
    handler: async function (request, reply) {
      /*
        Fatto in questo modo, cioè usando fastify etc. è  perfetto come rappresentazione del simulatore ma
        se la simulazione è troppo lunga il sistema essendo mono thread si  blocca.
      */
      // await simulatore(fastify, request.query.mondo)
      // return { mondo: request.query.mondo+' PARTITO' }

      // proviamo a renderlo a worker e quindi a piu thread
      const mondo = request.query.mondo

      if (poolworld[request.query.mondo]) {
        return { mondo: mondo + ' PARTITO DA UN PEZZO' }
      }else{
        console.log(path.join(__dirname, '../bl/worker.js'))
        const worker = new Worker(path.join(__dirname, '../bl/worker.js'), {
          workerData: { mondo }
        })

        worker.on('message', messaggio)
        worker.on('error', errore)
        worker.on('exit', code => {
          if (code !== 0)
            return(new Error(`Worker stopped with exit code ${code}`))
        })
        worker.postMessage({})
        return { mondo: mondo + ' PARTITO' }
      }
    }
  })

  function messaggio (msg) {
    console.log(msg)
    if (msg.world) {
      poolworld[msg.mondo] = msg.world
    }
  }

  function errore () {
    console.log('REJECT PER ERRORE DAL WORKER')
  }

}
