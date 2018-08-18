<template>
  <div class="episode-block">
    <div class="eb__header">
      <div class="eb__header-number-block">{{ obj.no }}</div>
      <div class="eb__header-date">3 July, 2018</div>
    </div>
    <div class="eb__content">
      <h3>How to Scale Design Sprints in Organisations</h3>
      <p ref="clamp" class="p-card">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis
        cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh
        et justo cursus idrem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis
        cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh
        et justo cursus id</p>
    </div>
    <div class="eb__footer">
      <a href="episode-036.html" class="btn btn-text btn-text__card w-button">read more</a>
    </div>
  </div>
</template>

<script>
  const lineClamp = require('line-clamp');
  export default {
    mounted: async function() {
    const data = await fetch("./episode.json");
    const allEpisodes = await data.json();
    this.episodes = allEpisodes.episodes;
    // to zrobić
    lineClamp(this.$refs.clamp, 5)
    },
    props: ['obj'],
    data () {
        return {
            episodes: [],
      }
    },
}
</script>

<style scoped>
    .episode-block {
        margin-bottom: 30px;
    }
</style>

