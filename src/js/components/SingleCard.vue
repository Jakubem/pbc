<template>
  <a
    class="episode-block" 
    :href="`/episode.html?episode=${obj.no}`">
    <div class="eb__header">
      <div class="eb__header-number-block">
        {{ `#${zeroPad(obj.no)}` }}
      </div>
      <div class="eb__header-date">
        {{ formatDate(obj.date) }}
      </div>
    </div>
    <div class="eb__content">
      <h3 class="eb__content-h3">{{ obj.title }}</h3>
      <p ref="clamp" class="p-card">{{ uri(obj.content) }}</p>
    </div>
    <div class="eb__footer">
      <a 
        ref="link"
        :href="`/episode.html?episode=${obj.no}`"
        class="btn btn-text btn-text__card w-button">read more</a>
    </div>
  </a>
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
      // clickCard() {
      //  this.$refs.link.click();
      // },
      // handleMouseUp() {
      //   this.isMouseDown = false;
      //   if (new Date() - this.timer <= 100) {
      //     this.clickCard();
      //   }
      // },
      // handleMouseDown() {
      //   this.isMouseDown = true;
      //   this.timer = new Date();
      // }
    },
    props: ['obj'],
    data () {
        return {
          isMouseDown: false,
          timer: 0,
        };
    },
}
</script>

<style scoped>
    .episode-block {
        margin-bottom: 30px;
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
</style>

