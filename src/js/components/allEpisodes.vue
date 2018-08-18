<template>
  <div>
    <div class="section-title">
      <h2>All episodes</h2>
    </div>
    <div v-for="episode in episodes" :key="episode.no" class="episodes-wrapper">
      <single-card :obj="episode"></single-card>
    </div>
  </div>
</template>

<script>
  import SingleCard from './SingleCard.vue';
  export default {
    components: {
      SingleCard,
    },
    mounted: async function() {
    const data = await fetch("https://pbc.koduje.pl/episodes");
    const allEpisodes = await data.json();
    this.episodes = allEpisodes.items;
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

</style>
