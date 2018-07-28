import Vue from 'vue';
import '../css/style.scss';

import EpisodeTemplate from './components/EpisodeTemplate.vue';
import CardWrapper from './components/CardWrapper.vue';

if (document.getElementById("app")) {
    const app = new Vue({
        el: "#app",
        data: {
            test: 'jakaś data',
            episodes: []
        },
        components: {
            'episode-template': EpisodeTemplate,
            'card-wrapper': CardWrapper
        },
    })
}