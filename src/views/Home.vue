<template>
    <div class="home-container flex">
        <div class="home-content flex">
            <article-element v-for="(article, index) in articlesData" :key="index" :docId="article.docId" :articleTitle="article.articleTitle" 
                        :articleContent="article.articleContent" :publishDate="article.publishDate" :viewsNumber="article.viewsNumber" 
                        :votesNumber="article.votesNumber" :averageRating="article.averageRating"
            />
        </div>
    </div>
</template>

<script>
import ArticleElement from '../components/ArticleElement.vue'
import { mapState } from "vuex"

export default {
    components: {
        ArticleElement
    },

    computed: {
        ...mapState(['articlesData'])
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    justify-content: center;
    background-color: #fff;

    .home-content {
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 1500px;
    }
}
</style>
