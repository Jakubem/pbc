import Vue from 'vue';
import '../css/style.scss';

import EpisodeTemplate from './components/EpisodeTemplate.vue';
import CardWrapper from './components/CardWrapper.vue';
import Home from './components/Home.vue';

if (document.getElementById("app")) {
  const app = new Vue({
    el: "#app",
    data: {
      episodes: []
    },
    components: {
      'episode-template': EpisodeTemplate,
      'card-wrapper': CardWrapper,
      'home': Home,
      SocialSharing,
    },
  })
}