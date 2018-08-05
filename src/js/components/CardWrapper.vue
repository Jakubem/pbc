<template>
  <div>
    <div class="section-title">
      <h2>All episodes</h2>
      </div>
      <div class="episodes-wrapper">
        <carousel ref="carousel" :perPageCustom="[[0, 1], [800, 2], [1100, 3]]">
            <slide v-for="episode in test" :key="episode.no">
                <single-card :obj="test"></single-card>
            </slide>
        </carousel>
    </div>
  </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  import SingleCard from './SingleCard.vue';
  import ArrowNextCarousel from './svgComponents/ArrowNextCarousel.vue';
  import ArrowPrevCarousel from './svgComponents/ArrowPrevCarousel.vue';
  export default {
    components: {
       'single-card': SingleCard,
        Carousel,
        Slide
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
        test: [
          {no: 1},
          {no: 2},
          {no: 3},
          {no: 4},
          {no: 5}
        ] 
      }
    },
}
</script>
<style scoped>
    .VueCarousel-wrapper {
        padding: 0 50px;
    }
    /* jakub hotfix */
    .VueCarousel {
        max-width: 100%;
    }
    .arrow > .nav-arr {
        cursor: pointer;
    }
    /* 😓 */
    .arrow-navigation {
      float: right;
    }
</style>
