<template>
  <div class="episode-block">
    <div class="eb__header">
      <div class="eb__header-number-block">{{ obj.no }}</div>
      <div class="eb__header-date">{{ obj.date }}</div>
    </div>
    <div class="eb__content">
      <h3>How to Scale Design Sprints in Organisations</h3>
      <p ref="clamp" class="p-card">{{ uri(obj.content) }}</p>
    </div>
    <div class="eb__footer">
      <a :href="`/episode.html?episode=${obj.no}`" class="btn btn-text btn-text__card w-button">read more</a>
    </div>
  </div>
</template>

<script>
  import lineClamp from 'line-clamp';
  export default {
    mounted: async function() {
      // https://www.npmjs.com/package/line-clamp => to review
      const p = this.$refs.clamp;
      await lineClamp(p, 5);
    },
    methods: {
      uri(str) {
        return decodeURIComponent(str)
      }
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

