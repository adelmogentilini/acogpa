<template>
  <div class="home">
    <b-row>

      <img alt="Dadi logo" src="../assets/world-icon.jpg"
           style="max-width: 100px; max-height: 100px">
      <h2 style="vertical-align: center; margin-top: 50px">{{this.mondo}}</h2>
    </b-row>
    <div class="orizzontal-details">
      <v-stage ref="stage" :config="configKonva">
        <v-layer ref="layer">

        </v-layer>
      </v-stage>
    </div>
  </div>
</template>
<script>
  const axios = require('axios');
  const Konva = require('konva');
  export default {
    data() {
      return {
        mondo: '',
        situazione: [],
        tot_row: 10,
        tot_col: 10,
        rect_width: 30,
        rect_height: 30,
        offset_x: 0,
        colori: ['red', 'yellow', 'green', 'purple', 'grey', 'aqua']
      };
    },
    methods: {
      askWorld: async function () {
        const response = await axios.get('http://localhost:3000/situazione', {
            params: {
              mondo: this.mondo.trim()
            }
          }
        );
        this.situazione = response.data;
      },
      redraw: async function(){
        const stage = this.$refs.stage.getStage();
        var width = window.innerWidth
        width = (width > this.tot_row * this.rect_width) ? width : (this.tot_row * this.rect_width)
        this.offset_x = (width - (this.tot_row * this.rect_width)) / 2 - this.rect_width
        const layer = stage.getLayers()[0]
        await this.askWorld()
        console.log(`per questo mondo ${this.mondo} chiesta la situazione ${this.situazione}`)
        console.log(this.situazione)

        let row,
          column, indice;
        for (column = 0; column < this.tot_col; column++) {
          for (row = 0; row < this.tot_row; row++) {
            indice = column * 10 + row;
            let colore = 'green'
            if(isOdd(this.situazione[indice])){
              let numero_colore = Math.round(Math.random() * (this.colori.length+1))
              if(numero_colore >= this.colori.length){
                numero_colore = this.colori.length-1
              }
              colore = this.colori[numero_colore]
            }else{
              if(this.mondo.toUpperCase() === 'VERONICA'){
               colore = 'black'
              }else{
               colore = 'blue'
              }

            }
            layer.add(new Konva.Rect({
              x: 40 * column + this.offset_x,
              y: 40 * row,
              width: this.rect_width,
              height: this.rect_height,
              fill: colore,
              name: 'rect',
              draggable: true
            }));
          }
        }
        layer.draw();
      }
    },
    computed: {
      configKonva:
        function () {
          var width = window.innerWidth;
          var height = window.innerHeight - 100;
          height = (height > this.tot_col * this.rect_height) ? height : (this.tot_col * this.rect_height) + 100;
          width = (width > this.tot_row * this.rect_width) ? width : (this.tot_row * this.rect_width);
          return {
            width: width,
            height: height
          };
        }
    },
    async created() {
      console.log('CREATED ::: >>> ');
    },
    async mounted() {
      this.mondo = this.$route.query.world;
      await this.redraw();
      setInterval(async function () {
        await this.redraw();
      }.bind(this), 500);

    }
  };

  function isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n%2));
  }

  function isOdd(n) {
    return isEven(Number(n) + 1);
  }

</script>
<style scoped>

  .orizzontal-details {
    display: inline-flex;
    flex-wrap: wrap;
    align-content: center;
  }


  .mondi {
    padding: 40px 0;
  }
</style>
