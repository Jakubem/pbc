<template>
<div class="audio-wrapper">
  <audio controls>
    <!-- safari will work only with wav, mp3 or flac. (according to this: https://hpr.dogphilosophy.net/test/)-->
    <source src="http://www.music.helsinki.fi/tmt/opetus/uusmedia/esim/a2002011001-e02-ulaw.wav" type="audio/wav">
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
    box-shadow: 5px 3px 7px rgba(0, 0, 0, 0.5);
    -webkit-appearance: none;
    background-color: #ffb900;
  }
  audio::-webkit-media-controls-panel {
    background-color: #ffb900;
  }
</style>
