<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <router-link :to="{ name: 'home'}">
          <v-list-item>
            <v-list-item-action>
              <v-icon>play_circle_outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Show stream</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'presets', params: { uid: user.uid }}">
        <v-list-item @click="" v-if="isAuth">
          
            <v-list-item-action>
              <v-icon>playlist_add</v-icon>
            </v-list-item-action>
            
            <v-list-item-content>
              <v-list-item-title>Create stream presets</v-list-item-title>
            </v-list-item-content>
          
        </v-list-item>
        </router-link>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signIn" v-if="!isAuth">
          <v-list-item-action>
            <v-icon>input</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>SignIn</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut" v-if="isAuth">
          <v-list-item-action>
            <v-icon>directions_run</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>SignOut</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> <router-link :to="{ name: 'home'}">Application</router-link></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-row
        align="center"
        style="max-width: 250px"
      >
        <v-text-field
          placeholder="Add Stream..."
          single-line
          color="white"
          hide-details
        ></v-text-field>
        <v-icon @click="addStream" :large=true>add</v-icon>
      </v-row>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import firebase from 'firebase'

  export default {
    methods: {
      signIn: function () {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
      },
      signOut: function () {
        firebase.auth().signOut()
      },
      onAuth () {
        firebase.auth().onAuthStateChanged( user => {
          if(user) {
            this.isAuth = true
            this.user = user
          } else {
            this.isAuth = false
            this.user = {uid: null}
          }
        })
      },
      addStream () {
        
      }
    },
    props: {
      source: String,
    },
    data: function () {
      return {
        drawer: null,
        user: {uid: null},
        isAuth: false
      }
    },
    created () {
      this.$vuetify.theme.dark = true
      this.onAuth()
    }
  }
</script>

<style scoped>
a {  text-decoration: none;}
</style>