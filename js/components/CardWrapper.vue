<template>
<div>
  <div class="episodes-wrapper">
    <single-card v-for="episode in episodes" :key="episode.id" :title="episode"></single-card>
  </div>
</div>
</template>

<script>
import SingleCard from './SingleCard.vue';  
  export default {
    components: {
       'single-card': SingleCard,
    },
    mounted: async function() {
    const data = await fetch("./episode.json");
    const allEpisodes = await data.json();
    this.episodes = allEpisodes.episodes;
    },
    methods: {
    },
    data () {
      return {
        episodes: [],
      }
    },
}
</script>

<style scoped>
  /* nic tu */
</style>
