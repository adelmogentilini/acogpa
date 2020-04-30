<template>
  <div>
    <img alt="Dadi logo" src="../assets/logo2.jpg" style="max-height: 200px">
    <b-col style="display: inline-flex">
      <b-form-input v-model="mondoDaAttivare" style="margin-right: 20px"
                    placeholder="nome mondo da attivare"></b-form-input>
      <b-button variant="success" v-on:click="this.activeWorld">Active</b-button>
    </b-col>
    <div class="mondi">
      <div v-if="mondi" class="orizzontal-details">
        <div v-for="world in mondi" :key="world">
          <b-card
            title=""
            :img-src="require('../assets/world-icon.jpg')"
            img-alt="Image"
            img-top
            style="max-width: 10rem;padding-right: 20px;margin: 10px"
            class="mb-3"
          >
            <b-card-text>
              {{world}}
            </b-card-text>
            <b-button v-on:click="showWorld(world)" variant="danger">Apri</b-button>
          </b-card>
        </div>
      </div>
      <div v-else>
        <h2>
          Ancora nessun mondo attivo
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css';
  // Nel processo di rendering (pagina web).
  const { ipcRenderer } = require('electron');

  var catcher = 0;

  function setMessage(msg) {
    this.response_message = msg;
  }

  const axios = require('axios');
  export default {
    name: 'HomeGamePage',
    props: {
      msg: String,
    },
    data() {
      return {
        mondi: null,
        mondoDaAttivare: null,
      };
    },
    methods: {
      askWorld: async function () {
        const response = await axios.get('http://localhost:3000/list');
        this.mondi = response.data.mondi;
      },
      activeWorld: async function () {
        const response = await axios.get('http://localhost:3000/start', {
          params: {
            mondo: this.mondoDaAttivare.trim()
          }
        });
        console.log(response);
      },
      showWorld: function (world) {
        // const currentime = new Date();
        // console.log(`SHOW ${world} ::: ${currentime}`);
        // console.log(ipcRenderer.sendSync('open-new-world', world)) // stampa "pong"
        catcher = setMessage.bind(this);
        ipcRenderer.send('open-new-world', world);
      }
    },
    async created() {
      await this.askWorld();
      setInterval(async function () {
        await this.askWorld();
      }.bind(this), 10000);

    }
  };
  //********************************************************************************
  //********************************************************************************

  ipcRenderer.on('open-new-world', (event, a_new_message) => {
    catcher(a_new_message);
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .orizzontal-details {
    display: inline-flex;
    flex-wrap: wrap;
    align-content: center;
  }

  .iconWorld {
    width: 80px;
    height: 80px;
  }

  .mondi {
    padding: 40px 0;
  }
</style>
