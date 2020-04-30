'use strict'

const fp = require('fastify-plugin')

const poolworld = []

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('setWorld', (name, i, j, val) => {
    const world = poolworld[name]
    world[i][j] = val
  })
  fastify.decorate('worldVal', (name, i, j) => {
    const world = poolworld[name]
    return world[i][j]
  })
  fastify.decorate('worldAll', async (name) => {
    const world = poolworld[name]
    if(world){
      return world
    }else{
      return 'MONDO NON ANCORA PARTITO'
    }
  })
  fastify.decorate('initWorld', async(name) => {
    const world = new Array(10)
    poolworld[name] = world
    for (let i = 0; i < 11; i++) {
      world[i] = new Array(10)
      for (let j = 0; j < 11; j++) {
        world[i][j] = 0
      }
    }
  })
})
