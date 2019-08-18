<template>
  <iframe
    :src="`https://player.twitch.tv/?channel=${broadcast}`"
    frameborder="0"
    allowfullscreen="true"
    scrolling="no"
    style="min-height: 378px; min-width:620px;     
    width:100%;
    height:100%;"
  ></iframe>
</template>

<script>
export default {
  props: {
    broadcast: String
  }
};
</script>

<style>
/* .twitch-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}
.twitch-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */
</style>
