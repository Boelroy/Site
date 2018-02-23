const Vue = require('vue');

const template = `<header class="header">
  <div class="header-container">
    <a href="">
      <i></i>
    </a>
    <div class="header-nav">
    <ul>
      <li><a-link href="/page/2">About</a-link></li>
      <li class="active"><a-link href="/?tesst=1">Blog</a></li>
      <li>Contact</li>
    </ul>
    </div>
  </div>
</header>`

const Header = Vue.component('b-header', {
  template: template
})
