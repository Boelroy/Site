import Vue from 'vue'
import Header from '../components/header'
const HomePost = require('../components/home/post');
const template = `<div>
  <b-header ></b-header>
  <div class="artical-container home">
    <template v-for="(index, post) in posts">
    <home-post v-if="index < 3" v-bind:post="post"></home-post>
    </template>
  </div>
</div>`

const HomePage = Vue.component('page-home', {
  template: template,
  props: ['route'],
  data(){
    return {
      posts: []
    }
  },
  async ready() {
    let page = this.route.params[0];
    const response = await fetch(`/api/posts/${page ? page : 1}.json`);
    const data = await response.json();
    this.posts = data.data;

      // .then((response) => {
      //   return response.json()
      // }, (error) => {

      // }).then((data) => {
      //   this.posts = data.data;
      // })
  },
  watch: {
    route() {
      let page = this.route.params[0];
      fetch(`/api/posts/${page ? page : 1}.json`)
        .then((response) => {
          switch(response.status) {
            case 404: 
              return Promise.reject();
          }
          return response.json();
        }).then((data) => {
          this.posts = data.data;
        }, (error) => {
          this.posts = [];
        })
    }
  }
})

module.exports = HomePage;