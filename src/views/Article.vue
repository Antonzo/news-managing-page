<template>
    <div class="article-container flex">
        <div class="article-content flex flex-column">
            <span class="publish-date">{{ currentArticle.publishDate }}</span>
            <h2>{{ currentArticle.articleTitle }}</h2>
            <pre>{{ currentArticle.articleContent }}</pre>
            <div class="info-container flex bottom">
                <div class="info-sub-container flex">
                    <img src="@/assets/icon-eye.svg">
                    <span>{{ viewsNumberPrint }}</span>
                </div>
                <div class="info-sub-container flex">
                    <img src="@/assets/icon-star.svg">
                    <span>{{ currentArticle.averageRating }}</span>
                </div>
                <div class="info-sub-container flex">
                    <img src="@/assets/icon-person.svg">
                    <span>{{ votesNumberPrint }}</span>
                </div>
                <div class="buttons flex right">
                    <button @click="askDelete" class="red">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data: () => ({
        loading: null
    }),

    methods: {
        ...mapMutations(['TOGGLE_DELETE', 'SET_CURRENT_ARTICLE']),

        askDelete() {
            this.TOGGLE_DELETE();
        },
    },

    computed: {
        ...mapState(['articlesData', 'deleteActive']),

        currentArticle() {
            return this.articlesData.filter(article => article.docId === this.$route.params.docId)[0];
        },

        viewsNumberPrint() {
            if (this.currentArticle)
                return this.currentArticle.viewsNumber >= 1000 ? (this.currentArticle.viewsNumber / 1000).toFixed(1) + 'k' : this.currentArticle.viewsNumber;
            return null;
        },

        votesNumberPrint() {
            if (this.currentArticle)
                return this.currentArticle.votesNumber >= 1000 ? (this.currentArticle.votesNumber / 1000).toFixed(1) + 'k' : this.currentArticle.votesNumber;
            return null;
        }
    },

    created() {
        this.SET_CURRENT_ARTICLE(this.$route.params.docId);
    }
}
</script>

<style lang="scss" scoped>
.article-container {
    justify-content: center;
    background-color: #141625;

    .article-content {
        align-items: center;
        background-color: #fff;
        max-width: 800px;
        padding: 5px 10px;
        color: #141625;

        @media screen and (min-width: 500px) {
            padding: 5px 15px;
        }
        @media screen and (min-width: 768px) {
            padding: 10px 20px;
        }
        @media screen and (min-width: 800px) {
            border-radius: 10px 10px 0 0;
        }

        .publish-date {
            align-self: flex-end;
        }

        h2 {
            text-align: center;
            margin-top: 10px;
        }

        pre {
            margin-top: 20px;
            margin-bottom: 20px;
            white-space: pre-wrap;
        }

        .info-container {
            width: 100%;
            gap: 10px;
            align-self: flex-start;
            justify-content: flex-start;
            align-items: center;

            .info-sub-container {
                gap: 2px;
                img {
                    width: 15px;
                    filter: invert(14%) sepia(3%) saturate(5117%) hue-rotate(314deg) brightness(90%) contrast(93%);
                    
                    @media screen and (min-width: 500px) {
                        width: 16px;
                    }
                    @media screen and (min-width: 768px) {
                        width: 18px;
                    }
                    @media screen and (min-width: 1200px) {
                        width: 20px;
                    }
                }
            }

            .buttons {
                align-items: center;
                justify-content: center;

                button {
                    cursor: pointer;
                    padding: 8px 18px;
                    border-radius: 14px;
                    border: none;
                    border: none;
                    color: #fff;
                }
            }
        }
    }
}
</style>
