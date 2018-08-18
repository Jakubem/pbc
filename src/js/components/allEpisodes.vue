<template>
  <div>
    <div class="section-title">
      <h2>All episodes</h2>
    </div>
    <div class="all-episodes-wrapper">
      <single-card v-for="episode in episodes" :key="episode.no" :obj="episode">

      </single-card>
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
  .all-episodes-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .episode-block {
    max-width: 350px;
  }
</style>
