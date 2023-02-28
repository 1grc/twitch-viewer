<template>
  <v-container class="fill-height" fluid style="height: 100%">
    <v-row align="center" justify="center" style="height: 100%">
      <v-col v-for="broadcast in twitchBroadcasts" :key="broadcast" cols="sm">
        <v-responsive :aspect-ratio="16 / 9">
          <TwitchViewer :broadcast="broadcast" :isShowComment="false" />
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TwitchViewer from "@/components/TwitchViewer.vue";
export default {
  name: "home",
  data() {
    return {
      twitchBroadcasts: [],
    };
  },
  components: {
    TwitchViewer,
  },
  methods: {
    addBroadcastElement(inputValue, selected) {
      this[`${selected}Broadcasts`].push(inputValue);
      this.$router.push({
        name: "home",
        query: {
          twitch: this.twitchBroadcasts,
        },
      });
    },
    removeBroadcastElement(selected) {
      // TODO
      this[`${selected}Broadcasts`] = this[`${selected}Broadcasts`].filter(
        (elem) => elem === selected
      );
      this.$router.push({
        name: "home",
        query: {
          twitch: this.twitchBroadcasts,
        },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const channels = to.query.twitch
        .split(",")
        .filter((channel) => channel !== "");
      if (channels.length > 0) {
        channels.forEach((channel) => {
          vm.twitchBroadcasts.push(channel);
        });
      }
    });
  },
};
</script>

<style>
v-row {
  max-height: 100vh;
}
</style>
