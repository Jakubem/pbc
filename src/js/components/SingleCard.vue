<template>
  <div class="episode-block">
    <div class="eb__header">
      <div class="eb__header-number-block">
        {{ `#${zeroPad(obj.no)}` }}
      </div>
      <div class="eb__header-date">
        {{ formatDate(obj.date) }}
      </div>
    </div>
    <div class="eb__content">
      <h3>How to Scale Design Sprints in Organisations</h3>
      <p ref="clamp" class="p-card">{{ uri(obj.content) }}</p>
    </div>
    <div class="eb__footer">
      <a 
        :href="`/episode.html?episode=${obj.no}`" 
        class="btn btn-text btn-text__card w-button">read more</a>
    </div>
  </div>
</template>

<script>
  import lineClamp from 'line-clamp';
  import * as Utils from '../utils';

  export default {
    mounted: async function() {
      // https://www.npmjs.com/package/line-clamp => to review
      await '';
      const p = this.$refs.clamp;
      lineClamp(p, 5);
    },
    methods: {
      uri(str) {
        return Utils.uri(str);
      },
      formatDate(str) {
        return Utils.formatDate(str);
      },
      zeroPad(i) {
        return Utils.zeroPad(i);
      },
    },
    props: ['obj'],
    data () {
        return {
      }
    },
}
</script>

<style scoped>
    .episode-block {
        margin-bottom: 30px;
    }
</style>

