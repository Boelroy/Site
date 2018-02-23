const Vue = require('vue');
const template = `
  <a-link :href="'/'+post.slug">
    <artical>
      <img src="/css/images/japanblog_dribbble.png" class="artical__thumbnail">
      <div class="artical__entry">{{post.title}}</div>
    </artical>
  </a-link>`

const HomePosts = Vue.component('home-post', {
  template: template,
  props: {
    post : {
      type: Object
    }
  }

})

module.exports = HomePosts;