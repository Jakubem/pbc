<template>
  <div class="all-episodes">
    <div class="section-title">
      <h2 class="all-episodes__header">
        All episodes
      </h2>
    </div>
    <div class="all-episodes-wrapper">
      <scale-loader 
        v-if="!loaded"
        color="#ffb900"
        size="40px">
      </scale-loader>
      <single-card 
        v-if="loaded"
        v-for="episode in episodes" 
        :key="episode.no" 
        :obj="episode">
      </single-card>
    </div>
  </div>
</template>

<script>
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
  import SingleCard from './SingleCard.vue';
  export default {
    components: {
      SingleCard,
      ScaleLoader,
    },
    mounted: async function() {
        const data = await fetch("https://pbc.koduje.pl/episodes");
        const allEpisodes = await data.json();
        this.episodes = allEpisodes.items;
        this.loaded = true;
    },
    data () {
      return {
        episodes: [],
        loaded: false,
      }
    },
}
</script>

<style scoped>
  .all-episodes-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .all-episodes {
    max-width: 1200px;
    padding: 18px;
    margin: 0 auto;
  }
  .episode-block {
    max-width: 350px;
    min-width: 150px;
  }
  .section-title {
    margin: 8px;
  }
  .v-spinner {
    margin: 0 auto;
  }

  .all-episodes__header {
    margin: 0 0 24px 0;
  }
  @media (max-width: 800px) {
    .section-title {
      margin: 4px;
    }
    .all-episodes-wrapper {
      justify-content: center;
    }
    .episode-block {
      max-width: unset;
    }
  }
  @media (max-width: 600px) {
  }
</style>
