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
</style>
