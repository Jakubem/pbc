<template>
  <div>
    <scale-loader v-if="!loaded" color="#ffb900" size="40px">
    </scale-loader>
    <div v-if="loaded" class="header-episode">
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
                  <img alt="itunes" src="images/itunes-icon.svg" class="app-icon">
                </a>
                <a href="https://open.spotify.com/show/1qvzYYHQko5sMuKWmoundZ?si=hzuKMuYlRciD3M-6IjfCoQ" target="_blank" class="icon-link w-inline-block">
                  <img alt="spotify" src="images/Spotify-Icon.svg" class="app-icon">
                </a>
                <a href="https://soundcloud.com/ajsmartdesign" target="_blank" class="icon-link w-inline-block">
                  <img alt="Radio Public" src="images/RadioPublic-Logo.png" class="app-icon">
                </a>
                <a href="https://www.stitcher.com/podcast/the-product-breakfast-club?refid=stpr" target="_blank" class="w-inline-block">
                  <img alt="sticher" src="images/stitcher-icon.png" class="app-icon">
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
                    <img alt="facebook" src="images/facebook-letter-logo.svg" class="card-icon share-icon">
                  </network>
                </social-sharing>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loaded" class="episode-info">
      <div class="container container__episode-info">
        <div class="grid">
          <div class="col-15p"></div>
          <div class="col-70p">
            <p class="p-large">{{ uri(episode.content) }}
              <a title="medium" href="https://medium.com/product-breakfast-club-links-unofficial" target="_blank" class="text-link"></a>
            </p>
            <div class="episodes-nav episodes-nav__border">
              <a 
                :href="hrefPrev" 
                rel="prev" 
                class="btn btn-text w-button"
                :aria-hidden="isEmptyUrl(hrefPrev)"
                :class="{ 'disabled': isEmptyUrl(hrefPrev) }">
                <arrow-prev></arrow-prev> Previous
              </a>
              <a 
                :href="hrefNext" 
                rel="next" 
                :aria-hidden="isEmptyUrl(hrefNext)"
                class="btn btn-text w-button" 
                :class="{ 'disabled': isEmptyUrl(hrefNext) }">
                Next <arrow-next></arrow-next>
              </a>
            </div>
            <!-- <div id="disqus_thread"></div> -->
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
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
  import Player from './Player.vue';
  import SocialSharing from 'vue-social-sharing'
  import * as Utils from '../utils';
  export default {
    components: {
      ArrowNext,
      ArrowPrev,
      ScaleLoader,
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
    const episodesIds = dataFromJson.items
      .map(episode => episode.no)
      .sort((a,b) => a - b);
    
    const episodeIndex = episodesIds.indexOf(Number(epNumber));
    const nextEpisode = episodesIds[episodeIndex + 1];
    const previousEpisode = episodesIds[episodeIndex -1];

    const latestEpisode = dataFromJson.items.find(episode => episode.no === largestNo);
    const selectedEpisode = dataFromJson.items.find(objMatch);

    if (!selectedEpisode || selectedEpisode === null) {
      window.location.href = `/404.html`;
      return;
    } else {
      this.episode = selectedEpisode;
    }

    document.title = `Product Breakfast Club | Episode #${this.zeroPad(epNumber)} | ${selectedEpisode.title}`;

    
    if (previousEpisode) {
      this.hrefPrev = `?episode=${previousEpisode}`;
    }
    if (nextEpisode) {
      this.hrefNext = `?episode=${nextEpisode}`;
    }


    // this.setupDisqus(this.episode);
    this.loaded = true;
},
  methods: {
    zeroPad(i) {
      return Utils.zeroPad(i);
    },
    isEmptyUrl(url) {
      if (!url || url === '#') {
        return true;
      }
      return false;
    },
    uri(str) {
      return Utils.uri(str);
    },
    formatDate(str) {
      return Utils.formatDate(str);
    },
    setupDisqus() {
      var disqus_config = function (episode) {
        this.page.url = 'https://www.productbreakfastclub.com/';  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = episode.no; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://productbreakfastclub.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  },
  computed: {
    shareLink: () => window.location.href
  },
  data () {
    return {
      episode: {},
      hrefPrev: '#',
      hrefNext: '#',
      loaded: false
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
