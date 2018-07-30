<template>
  <div>
    <div class="header">
      <div class="container navbar-container">
        <a href="index.html" class="link-block-2 w-inline-block">
          <img src="images/PBC-LOGO.svg" class="image">
        </a>
        <div class="navbar-nav">
          <a href="index.html" class="btn btn-text btn-nav w-button">Home</a>
          <a href="episodes.html" class="btn btn-text btn-nav w-button">episodes</a>
          <a href="about.html" class="btn btn-text btn-nav w-button">about</a>
          <div class="navbar-icons navbar-icons__header">
            <a href="https://itunes.apple.com/de/podcast/the-product-breakfast-club/id1320916842?l=en&amp;mt=2&amp;i=1000395595606"
              target="_blank" class="icon-link w-inline-block">
              <img src="images/itunes-icon.svg" class="app-icon">
            </a>
            <a href="https://open.spotify.com/show/1qvzYYHQko5sMuKWmoundZ?si=hzuKMuYlRciD3M-6IjfCoQ" target="_blank" class="icon-link w-inline-block">
              <img src="images/Spotify-Icon.svg" class="app-icon">
            </a>
            <a href="https://radiopublic.com/the-product-breakfast-club-WDpzqE" target="_blank" class="icon-link w-inline-block">
              <img src="images/RadioPublic-Logo.png" class="app-icon">
            </a>
            <a href="https://www.stitcher.com/podcast/the-product-breakfast-club?refid=stpr" target="_blank" class="w-inline-block">
              <img src="images/stitcher-icon.png" class="app-icon">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="header-episode">
      <div class="container">
        <a href="episodes.html" class="text-link breadcrumbs">Back to All Episodes</a>
        <div class="grid">
          <div class="col-15p">
            <div class="header-episode__number-block">{{ `#${episode.no}` }}</div>
            <div class="header-episode__date"></div>
          </div>
          <div class="col-70p">
            <h2>{{ episode.name }}</h2>
            <div class="player-placeholder">
              <div class="html-embed w-embed w-iframe">
                <iframe frameborder="0" height="200" scrolling="no" src="https://embed.radiopublic.com/e?ge=s1!3c5bf0c81c37166b78c6d28a2fcd0ebca57e944c&if=the-product-breakfast-club-WDpzqE&referrer=https:%2F%2Fmedium.com%2Fmedia%2F233b24493bca108b31ad8b3c92180e02%3FpostId%3Dcfba7aba1132"
                  width="100%"></iframe>
              </div>
            </div>
            <div class="header-episode__apps">
              <div class="text-apps">This episode is also available on:</div>
              <div class="episode-apps-icons">
                <a href="https://itunes.apple.com/de/podcast/the-product-breakfast-club/id1320916842?l=en&amp;mt=2&amp;i=1000395595606"
                  target="_blank" class="icon-link w-inline-block">
                  <img src="images/itunes-icon.svg" class="app-icon">
                </a>
                <a href="https://open.spotify.com/show/1qvzYYHQko5sMuKWmoundZ?si=hzuKMuYlRciD3M-6IjfCoQ" target="_blank"
                  class="icon-link w-inline-block">
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
              <a href="https://twitter.com/intent/tweet?text=xdddd" target="_blank" class="icon-link share-icon w-inline-block">
                <img src="images/twitter-icon.svg" class="card-icon share-icon">
              </a>
              <div class="fb-share-button" 
                data-href="https://www.pbc.com/episode.html"
                data-layout="button_count">
              </div>
              <!-- <a href="#" class="icon-link share-icon w-inline-block">
                <img src="images/facebook-letter-logo.svg" class="card-icon share-icon">
              </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="episode-info">
      <div class="container container__episode-info">
        <div class="grid">
          <div class="col-15p"></div>
          <div class="col-70p">
            <p class="p-large">{{ episode.description }}
              <a href="https://medium.com/product-breakfast-club-links-unofficial" target="_blank"
                class="text-link"></a>
              <br>
            </p>
            <div class="episodes-nav episodes-nav__border">
              <!-- do tych tu dać aria hiden na tru -->
              <a :href="hrefPrev" rel="prev" class="btn btn-text w-button" v-bind:class="{ disabled: firstEpisode }"><arrow-prev></arrow-prev> previous episode </a>
              <a :href="hrefNext" rel="next" class="btn btn-text w-button" v-bind:class="{ disabled: lastEpisode }">Next episode <arrow-next></arrow-next> </a>
            </div>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArrowNext from './ArrowNext.vue';
  import ArrowPrev from './ArrowPrev.vue';
  export default {
    components: {
      'arrow-next': ArrowNext,
      'arrow-prev': ArrowPrev,
    },
    mounted: async function() {
    const params = new URLSearchParams(window.location.search.substring(1));
    const data = await fetch("./episode.json");
    const dataFromJson = await data.json();
    const epLength = Number(dataFromJson.episodes.length);
    function objMatch(el) {
      return el.no === Number(epNumber);
    }
    const largestNo = Math.max(
      // ...foo => spread operator
      ...dataFromJson.episodes.map(episode => episode.no),
      // Math.max(1,2,3,4,5,6,7,8,9,10,11);
    );
    const epNumber = Number(params.get("episode")) || largestNo;
    const hrefNext = `?episode=${epNumber + 1}`;
    const hrefPrev = `?episode=${epNumber - 1}`;

    const latestEpisode = dataFromJson.episodes.find(episode => episode.no === largestNo);
    const selectedEpisode = dataFromJson.episodes.find(objMatch);

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
  },
    data () {
      return {
        episode: {},
        hrefPrev: '',
        hrefNext: '',
        lastEpisode: false,
        firstEpisode: false
      }
    },
  }
</script>

<style scoped>
  .episodes-nav a {
    display: flex;
    align-items: center;    
  }
</style>
