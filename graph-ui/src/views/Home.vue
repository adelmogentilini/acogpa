<template>
  <div class="home">
    <div v-if="!this.$route.query.world">
      <HomeGamePage msg="G - GAME - TEST -ELECTRON"/>
    </div>
    <div v-if="this.$route.query.world">
      <WorldGamePage msg="G - GAME - TEST -ELECTRON"/>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HomeGamePage from '@/components/HomeGamePage.vue';
  import WorldGamePage from '@/components/WorldGamePage.vue';


  export default {
    name: 'Home',
    components: {
      HomeGamePage,
      WorldGamePage
    },
  };
</script>
