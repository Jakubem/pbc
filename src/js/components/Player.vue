<template>
<div class="audio-wrapper">
  <audio controls>
    <!-- safari will work only with wav, mp3 or flac. (according to this: https://hpr.dogphilosophy.net/test/)-->
    <source :src="src" type="audio/wav">
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
    props: ['src']
  }
</script>

<style scoped>
  audio {
    width: 100%;
    border-radius: 50px;
    width: 100%;
    box-shadow: 5px 3px 7px rgba(0, 0, 0, 0.5);
    -webkit-appearance: none;
  }
</style>
