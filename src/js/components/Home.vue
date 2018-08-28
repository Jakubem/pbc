<template>
  <section class="episodes">
    <div class="section-title">
      <h2>Latest episodes</h2>
      <a 
        href="episodes.html" 
        class="text-link w-hidden-small w-hidden-tiny">
        View all episodes
      </a>
    </div>
    <scale-loader 
      v-if="!loaded"
      color="#ffb900"
      size="40px">
    </scale-loader>
    <carousel 
      v-if="loaded"
      ref="carousel" 
      v-on:pageChange="pageChange" 
      :perPageCustom="[[0, 1], [600, 2], [1100, 3]]"
      :paginationEnabled="false">
      <slide 
        v-for="episode in episodes.slice(0, 9)"
        :key="episode.no">
        <single-card :obj="episode">
        </single-card>
      </slide>
    </carousel>
    <div class="arrow-navigation">
      <a 
        class="arrow"
        :class="{ 'dimmed': firstEpisode }" 
        @click.prevent="prevSlide">
        <arrow-prev-carousel>
        </arrow-prev-carousel>
      </a>
      <a 
        class="arrow" 
        :class="{ 'dimmed': lastEpisode }" 
        @click.prevent="nextSlide">
        <arrow-next-carousel>
        </arrow-next-carousel>
      </a>
    </div>
    <a 
      href="episodes.html" 
      class="text-link desktop-hidden">
      View all episodes
    </a>
  </section>
</template>

<script>
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
  import { Carousel, Slide } from 'vue-carousel';
  import SingleCard from './SingleCard.vue';
  import ArrowNextCarousel from './svgComponents/ArrowNextCarousel.vue';
  import ArrowPrevCarousel from './svgComponents/ArrowPrevCarousel.vue';
  export default {
    components: {
      SingleCard,
      ArrowNextCarousel,
      ArrowPrevCarousel,
      ScaleLoader,
      Carousel,
      Slide
    },
    mounted: async function() {
    const data = await fetch("https://pbc.koduje.pl/episodes");
    const allEpisodes = await data.json();
    this.episodes = allEpisodes.items;
    this.loaded = true;
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
        i === 0 
          ? this.firstEpisode = true
          : this.firstEpisode = false;
        i === this.$refs.carousel.pageCount - 1 
          ? this.lastEpisode = true 
          : this.lastEpisode = false;
      }
    },
    computed: {
    },
    data () {
        return {
          episodes: [],
          firstEpisode: true,
          lastEpisode: false,
          loaded: false,
        }
      },
}
</script>

<style>
    .VueCarousel-wrapper {
      max-width: 1200px;
    }
    .VueCarousel {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .VueCarousel-slide {
      display: flex;
      align-items: stretch;
    }
    .arrow {
      cursor: pointer;
    }
    .desktop-hidden {
      display: none;
      text-align: center;
    }
    /* 😓 */
    .arrow-navigation {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-end;
    }
    .section-title {
      margin: 24px auto;
    }
    .section-title h2,
    .section-title .text-link {
      margin: 0 12px;
    }
    .dimmed {
      opacity: 0.2;
    }
    /* burdel.css */
    @media screen and (max-width: 1101px){
      .section-title h2,
      .section-title .text-link {
        margin: 0 32px;
      }
      .arrow {
        display: none;
      }
      .VueCarousel-wrapper {
        padding: 0 20px;
      }
    }
    @media (max-width: 800px){
      .desktop-hidden {
        display: block;
      }
      .eb__content-h3 {
        text-align: center;
      }
      .section-title h2 {
        margin: 0 24px;
      }
    }
</style>