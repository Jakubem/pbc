import Vue from 'vue';
import '../css/style.scss';

import EpisodeTemplate from './components/EpisodeTemplate.vue';
import AllEpisodes from './components/AllEpisodes.vue';
import Home from './components/Home.vue';

if (document.getElementById("app")) {
  const app = new Vue({
    el: "#app",
    components: {
      EpisodeTemplate,
      SocialSharing,
      AllEpisodes,
      Home,
    },
  })
}