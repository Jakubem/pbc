<template>
    <div>
        <carousel ref="carousel" :per-page="3">
            <slide v-for="episode in test" :key="episode.no">
                <single-card :obj="test"></single-card>
            </slide>
        </carousel>
        <a @click.prevent="prevSlide">Prev</a>
        <a @click.prevent="nextSlide">Next</a>
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
    methods: {
        // custom navigation
        nextSlide() {
            this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage());
        },
        prevSlide() {
            this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage());
        }
    },
    data () {
        return {
            episodes: [],
            // test episodes
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
