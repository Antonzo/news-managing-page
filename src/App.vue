<template>
<div v-if="articlesUploaded" id="app">
  <navigation/>
  <article-modal v-if="modalActive"/>
  <cancel-modal v-if="cancelActive"/>
  <delete-modal v-if="deleteActive"/>
  <router-view class="page-content"/>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Navigation from './components/Navigation.vue'
import ArticleModal from './components/ArticleModal.vue'
import CancelModal from './components/CancelModal.vue'
import DeleteModal from './components/DeleteModal.vue'

export default {
  components: {
    Navigation,
    ArticleModal,
    CancelModal,
    DeleteModal
  },

  computed: {
    ...mapState(['modalActive', 'cancelActive', 'deleteActive', 'articlesUploaded'])
  },

  methods: {
    ...mapActions(['GET_ARTICLES_DB'])
  },

  created() {
    this.GET_ARTICLES_DB();
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
html {
  font-size: 13px;

  @media screen and (min-width: 500px) {
      font-size: 14px;
  }
  @media screen and (min-width: 768px) {
      font-size: 16px;
  }
  @media screen and (min-width: 1200px) {
      font-size: 17px;
  }
}
#app {
  position: relative;
}
.page-content {
  padding-top: 45px;
  min-height: 100vh;
  @media screen and (min-width: 500px) {
    padding-top: 55px;
  }
  @media screen and (min-width: 768px) {
    padding-top: 60px;
  }
  @media screen and (min-width: 768px) {
    padding-top: 65px;
  }
}
ul {
  list-style-type: none;
}

.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}

.top {
  margin-bottom: auto;
}
.right {
  margin-left: auto;
}
.bottom {
  margin-top: auto;
}
.left {
  margin-right: auto;
}

.buttons {
  .red {
    background-color: #ec5757;
  }

  .purple {
    background-color: #7c5dfa;
  }

  .dark-purple {
    background-color: #252945;
  }
}


::-moz-selection {
  color: #fff;
  background: #ec5757;
}

::selection {
  color: #fff;
  background: #ec5757;
} 
</style>
