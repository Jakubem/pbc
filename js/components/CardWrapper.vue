<template>
<div>
  <div class="episodes-wrapper">
    <carousel :per-page="3">
      <slide v-for="episode in episodes" :key="episode.no">
        <single-card :obj="episode"></single-card>
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
      }
    },
}
</script>
