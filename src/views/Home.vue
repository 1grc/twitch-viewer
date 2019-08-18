<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col v-for="broadcast in twitchBroadcasts" :key="broadcast" cols="sm">
        <v-responsive :aspect-ratio="16 / 9">
          <TwitchViewer :broadcast="broadcast" :isShowComment="false" />
        </v-responsive>
      </v-col>
    </v-row>
    <!-- <YoutubeViewer
          v-for="broadcast in youtubeBroadcasts"
          :broadcast="broadcast"
          :key="broadcast"
        /> -->

    <!-- <TwitchChat v-show="isShowComment" :twitchBroadcasts="twitchBroadcasts" /> -->

    <!-- <footer class="footer">
      <label class="checkbox">
        <input type="checkbox" v-model="isShowComment" />
        Show chat |
      </label>
      <InputBroadcast v-on:addBroadcast="addBroadcastElement" />
    </footer> -->
  </v-container>
</template>

<script>
// import InputBroadcast from "@/components/InputBroadcast.vue";
import TwitchViewer from "@/components/TwitchViewer.vue";

// import TwitchChat from "@/components/TwitchChat.vue";
// import YoutubeViewer from "@/components/YoutubeViewer.vue";
export default {
  name: "home",
  data() {
    return {
      //isShowComment: false,
      twitchBroadcasts: []
      //youtubeBroadcasts: [],
      //chatTab: []
    };
  },
  components: {
    TwitchViewer
  },
  methods: {
    addBroadcastElement(inputValue, selected) {
      this[`${selected}Broadcasts`].push(inputValue);
      this.$router.push({
        name: "home",
        query: {
          twitch: this.twitchBroadcasts
          // youtube: this.youtubeBroadcasts
        }
      });
    },
    removeBroadcastElement(selected) {
      // TODO
      this[`${selected}Broadcasts`] = this[`${selected}Broadcasts`].filter(
        elem => elem === selected
      );
      this.$router.push({
        name: "home",
        query: {
          twitch: this.twitchBroadcasts
          // youtube: this.youtubeBroadcasts
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforerouteenter");
    next(vm => {
      let query = to.query;
      if (query.twitch) {
        if (typeof query.twitch === "object") {
          query.twitch.forEach(element => {
            vm.twitchBroadcasts.push(element);
          });
        }
        if (typeof query.twitch === "string") {
          vm.twitchBroadcasts.push(query.twitch);
        }
      }
      // if (query.youtube) {
      //   if (typeof query.youtube === "object") {
      //     query.youtube.forEach(element => {
      //       vm.youtubeBroadcasts.push(element);
      //     });
      //   }
      //   if (typeof query.youtube === "string") {
      //     vm.youtubeBroadcasts.push(query.youtube);
      //   }
      // }
      // vm.chatTab = vm.twitchBroadcasts[0];
    });
  }
};
</script>

<style>
v-row {
  max-height: 100vh;
}
</style>
