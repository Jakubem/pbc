<template>
    <div>
        <carousel :per-page="3">
            <slide v-for="episode in test" :key="episode.no">
                <single-card :obj="test"></single-card>
            </slide>
        </carousel>
        <button ></button>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import SingleCard from './SingleCard.vue';
  export default {
    components: {
       'single-card': SingleCard,
        Carousel,
        Slide
    },
    mounted: async function() {
    const data = await fetch("./episode.json");
    const allEpisodes = await data.json();
    this.episodes = allEpisodes.episodes
    },
    data () {
        return {
            episodes: [],
            test: [
                {
                    no: 1,
                },
                {
                    no: 2,
                },
                {
                    no: 3,
                },
                {
                    no: 4,
                },
                {
                    no: 5,
                }
            ] 
      }
    },
}
</script>
<style>
    .VueCarousel-wrapper {
        padding: 50px;
    }
</style>
