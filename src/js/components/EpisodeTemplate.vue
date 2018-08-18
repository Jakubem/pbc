<template>
  <div>
    <pulse-loader v-if="loading === true" color="#ffb900" size="40px">
    </pulse-loader>
    <div v-if="loading === false" class="header-episode">
      <div class="container">
        <a href="episodes.html" class="text-link breadcrumbs">Back to All Episodes</a>
        <div class="grid">
          <div class="col-15p">
            <div class="header-episode__number-block">
              {{ `#${zeroPad(episode.no)}` }}
            </div>
            <div class="header-episode__date">
              {{ formatDate(episode.date) }}
            </div>
          </div>
          <div class="col-70p">
            <h2>{{ episode.title }}</h2>
            <div class="player-placeholder">
              
            <!-- html player   -->
            <player :src="episode.file.url" />

            </div>
            <div class="header-episode__apps">
              <div class="text-apps">This episode is also available on:</div>
              <div class="episode-apps-icons">
                <a href="https://itunes.apple.com/de/podcast/the-product-breakfast-club/id1320916842?l=en&amp;mt=2&amp;i=1000395595606" target="_blank"
                  class="icon-link w-inline-block">
                  <img src="images/itunes-icon.svg" class="app-icon">
                </a>
                <a href="https://open.spotify.com/show/1qvzYYHQko5sMuKWmoundZ?si=hzuKMuYlRciD3M-6IjfCoQ" target="_blank" class="icon-link w-inline-block">
                  <img src="images/Spotify-Icon.svg" class="app-icon">
                </a>
                <a href="https://soundcloud.com/ajsmartdesign" target="_blank" class="icon-link w-inline-block">
                  <img src="images/RadioPublic-Logo.png" class="app-icon">
                </a>
                <a href="https://www.stitcher.com/podcast/the-product-breakfast-club?refid=stpr" target="_blank" class="w-inline-block">
                  <img src="images/stitcher-icon.png" class="app-icon">
                </a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="share-block">
              <div class="share-text">Share</div>
                <social-sharing :url="shareLink" inline-template>
                  <network network="twitter">
                    <img src="images/twitter-icon.svg" class="card-icon share-icon" alt="">
                  </network>
                </social-sharing>
                <social-sharing :url="shareLink" inline-template>
                  <network network="facebook">
                    <img src="images/facebook-letter-logo.svg" class="card-icon share-icon">
                  </network>
                </social-sharing>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading === false" class="episode-info">
      <div class="container container__episode-info">
        <div class="grid">
          <div class="col-15p"></div>
          <div class="col-70p">
            <p class="p-large">{{ uri(episode.content) }}
              <a href="https://medium.com/product-breakfast-club-links-unofficial" target="_blank" class="text-link"></a>
            </p>
            <div class="episodes-nav episodes-nav__border">
              <a 
                :href="hrefPrev" 
                rel="prev" 
                class="btn btn-text w-button"
                :aria-hidden="firstEpisode"
                :class="{ 'disabled': firstEpisode }">
                <arrow-prev></arrow-prev> Previous episode
              </a>
              <a 
                :href="hrefNext" 
                rel="next" 
                :aria-hidden="lastEpisode"
                class="btn btn-text w-button" 
                :class="{ 'disabled': lastEpisode }">
                Next episode <arrow-next></arrow-next>
              </a>
            </div>
          </div>
          <!-- <div class="col"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArrowNext from './svgComponents/ArrowNext.vue';
  import ArrowPrev from './svgComponents/ArrowPrev.vue';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import Player from './Player.vue';
  import SocialSharing from 'vue-social-sharing'
  import * as Utils from '../utils';
  export default {
    components: {
      'arrow-next': ArrowNext,
      'arrow-prev': ArrowPrev,
      PulseLoader,
      Player,
      SocialSharing
    },
    mounted: async function() {
    const params = new URLSearchParams(window.location.search.substring(1));
    const data = await fetch("https://pbc.koduje.pl/episodes");
    const dataFromJson = await data.json();
    const epLength = Number(dataFromJson.items.length);

    function objMatch(el) {
      return el.no === Number(epNumber);
    }

    const largestNo = Math.max(
      // ...foo => spread operator
      ...dataFromJson.items.map(episode => episode.no),
      // Math.max(1,2,3,4,5,6,7,8,9,10,11);
    );
    const epNumber = Number(params.get("episode")) || largestNo;
    const hrefNext = `?episode=${epNumber + 1}`;
    const hrefPrev = `?episode=${epNumber - 1}`;

    const latestEpisode = dataFromJson.items.find(episode => episode.no === largestNo);
    const selectedEpisode = dataFromJson.items.find(objMatch);

    if (epNumber <= epLength && epNumber != undefined && epNumber != undefined) {
      this.episode = selectedEpisode;
      // this line
      // window.location.search = `?episode=${epNumber}`;
    } else {
      this.episode = latestEpisode;
      window.location.search = `?episode=${largestNo}`;
    }
    if (selectedEpisode.no < largestNo) {
      this.hrefNext = hrefNext;
    }
    if (selectedEpisode.no > 1) {
      this.hrefPrev = hrefPrev;
    }
    if (selectedEpisode.no === largestNo) {
      this.lastEpisode = true;
    }
    if (selectedEpisode.no === 1) {
      this.firstEpisode = true;
    }

    this.loading = false;
},
  methods: {
    zeroPad(i) {
      return Utils.zeroPad(i);
    },
    uri(str) {
      return Utils.uri(str);
    },
    formatDate(str) {
      return Utils.formatDate(str);
    }
    // trimTitle(str) {
    //   return Utils.trimTitle(str);
    // }
  },
  computed: {
    shareLink: () => window.location.href
  },
  data () {
    return {
      episode: {},
      hrefPrev: '',
      hrefNext: '',
      lastEpisode: false,
      firstEpisode: false,
      loading: true
    }
  },
}
</script>

<style scoped>
  .episodes-nav a {
    display: flex;
    align-items: center;    
  }
  .v-spinner {
    width: 100%;
    height: 525px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
