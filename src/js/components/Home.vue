<template>
    <section class="episodes">
        <!-- bind this to screen width -->
        <div class="section-title">
          <h2>Latest episodes</h2>
          <a href="episodes.html" class="text-link w-hidden-small w-hidden-tiny">View all episodes</a>
        </div>
        <carousel ref="carousel" v-on:pageChange="pageChange" :perPageCustom="[[0, 1], [800, 2], [1100, 3]]">
            <slide v-for="episode in test" :key="episode.no">
                <single-card :obj="test"></single-card>
            </slide>
        </carousel>
        <div class="arrow-navigation">
          <a class="arrow" :class="{ 'dimmed': firstEpisode }" @click.prevent="prevSlide">
              <arrow-prev-carousel></arrow-prev-carousel>
          </a>
          <a class="arrow" :class="{ 'dimmed': lastEpisode }" @click.prevent="nextSlide">
              <arrow-next-carousel></arrow-next-carousel>
          </a>
          <!-- <p>{{ currentIndex }}</p> -->
        </div>
    </section>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  import SingleCard from './SingleCard.vue';
  import ArrowNextCarousel from './svgComponents/ArrowNextCarousel.vue';
  import ArrowPrevCarousel from './svgComponents/ArrowPrevCarousel.vue';
  export default {
    components: {
        'single-card': SingleCard,
        'arrow-next-carousel': ArrowNextCarousel,
        'arrow-prev-carousel': ArrowPrevCarousel,
        Carousel,
        Slide
    },
    mounted: async function() {
    const data = await fetch("./episode.json");
    const allEpisodes = await data.json();
    this.episodes = allEpisodes.episodes;
    console.log(this.$refs.carousel);
    },
    methods: {
        // custom navigation
        nextSlide() {
          this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage());
        },
        prevSlide() {
          this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage());
        },
        pageChange(i) {
          // burdel.js
          this.firstEpisode = false;
          i === 0 ? this.firstEpisode = true : this.firstEpisode = false;
          i === this.$refs.carousel.pageCount - 1 ? this.lastEpisode = true : this.lastEpisode = false;
        }
    },
    computed: {
    },
    data () {
        return {
          episodes: [],
          // test episodes
          test: [
            {no: 1},
            {no: 2},
            {no: 3},
            {no: 4},
            {no: 5}
          ],
          firstEpisode: true,
          lastEpisode: false,
        }
      },
}
</script>
<style scoped>
    .VueCarousel-wrapper {
        padding: 0 50px;
    }
    .section-title {
        padding: 0 50px;
    }
    .arrow > .nav-arr {
        cursor: pointer;
    }
    /* 😓 */
    .arrow-navigation {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 0 50px;
    }
    .dimmed {
      opacity: 0.2;
    }
    /* burdel.css */
    @media screen and (max-width: 800px){      
      .arrow {
        display: none;
      }
    }
</style>