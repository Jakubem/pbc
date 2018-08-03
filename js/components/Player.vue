<template>
<div class="audio-wrapper">
  <audio src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Pl-Izotopy-article.ogg" controls>
  </audio>
</div>
</template>

<script>
  export default {
    mounted: function() {
    },
    methods: {
    },
    data () {
      return {
        episodes: [],
      }
    },
  }
</script>

<style scoped>
  audio {
    width: 100%;
    border-radius: 50px;
    width: 100%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }
</style>
