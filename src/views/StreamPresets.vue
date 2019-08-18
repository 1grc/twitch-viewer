<template>
  <v-container fluid>
    <v-card max-width="600" class="mx-auto">
      <v-toolbar dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Show stream</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="showStream">
          <v-icon :large="true">play_circle_outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list two-line subheader>
        <v-subheader>
          <v-row align="center">
            <v-text-field
              placeholder="Add stream for presets..."
              v-model="inputValueForAddStreamField"
              single-line
              color="white"
              hide-details
            ></v-text-field>
            <v-icon @click="addStreamForPresets" :large="true">add</v-icon>
          </v-row>
        </v-subheader>

        <v-list-item v-for="channelId in channelIds" :key="channelId" @click="">
          <v-list-item-content>
            <v-list-item-title v-text="channelId"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <a :href="'https://www.twitch.tv/' + channelId">
                <v-icon color="grey lighten-1">info</v-icon>
              </a>
            </v-btn>
          </v-list-item-action>
          <v-btn icon>
            <v-icon :large="true">delete_outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  props: ["uid"],
  data: function() {
    return {
      inputValueForAddStreamField: "",
      streamItems: [
        {
          channelId: "momochoco"
        }
      ],
      channelIds: [],
      pratform: null
    };
  },
  methods: {
    showStream() {
      this.$router.push({ name: "home", query: { twitch: this.channelIds } });
    },
    addPresets() {
      // TODO: プリセット単位の管理機能
    },
    addStreamForPresets(input) {
      if (this.inputValueForAddStreamField == "") return;
      const uid = this.$route.params.uid;
      this.channelIds.push(this.inputValueForAddStreamField);
      firebase
        .firestore()
        .collection("stream_presets")
        .doc(uid)
        .update({
          channel_ids: firebase.firestore.FieldValue.arrayUnion(
            this.inputValueForAddStreamField
          ),
          pratform: "twitch"
          // TODO: seq追加
        })
        .then(function(docRef) {
          console.log("Success");
          firebase
            .firestore()
            .collection("stream_presets")
            .doc(uid)
            .get()
            .then(snapshot => {
              console.log("success ", docRef);
              this.channelIds = snapshot.data().channel_ids;
            });
        })
        .catch(function(error) {
          console.error("Error", error);
        });
    }
  },
  created() {
    const uid = this.$route.params.uid;
    firebase
      .firestore()
      .collection("stream_presets")
      .doc(uid)
      .get()
      .then(snapshot => {
        snapshot.data();
        console.log("Current data: ", snapshot.data().channel_ids);
        this.channelIds = snapshot.data().channel_ids;
      });
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
