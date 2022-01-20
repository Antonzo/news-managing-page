<template>
    <div @click="askCancel" ref="articleWrap" class="article-modal-wrap flex">
        <loading v-show="loading"/>
        <form @submit.prevent="publishArticle" class="article-modal-content flex flex-column">
            <h4>Article description</h4>

            <div class="flex flex-column">
                <label for="articleTitle">Title</label>
                <input required type="text" id="articleTitle" v-model="articleTitle"/>
            </div>

            <div class="flex flex-column">
                <label for="articleContent">Content</label>
                <textarea required maxlength="3000" id="articleContent" v-model="articleContent"/>
            </div>
            
            <div class="buttons bottom flex">
                <button @click="closeModal" type="button" class="red">Cancel</button>
                <button @click="saveDraft" type="button" class="right dark-purple">Save</button>
                <button type="submit" class="purple">Publish</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import { uid } from "uid"
import Loading from "./Loading.vue"

export default {
    components: {
        Loading
    },

    data: () => ({
        loading: null,
        dateOptions: {year: "numeric", month: "short", day: "numeric"},
        docId: null,
        articleTitle: null,
        articleContent: null,
        publishDateUnix: null,
        publishDate: null,
        viewsNumber: null,
        votesNumber: null,
        averageRating: null,
    }),

    methods: {
        ...mapMutations(['TOGGLE_MODAL', 'TOGGLE_CANCEL', 'UPDATE_CURRENT_DRAFT', 'SET_CURRENT_ARTICLE', 'SET_ARTICLE']),
        ...mapActions(['ADD_ARTICLE_DB']),

        closeModal() {
            this.articleTitle = null;
            this.articleContent = null;
            this.UPDATE_CURRENT_DRAFT(null);
            this.TOGGLE_MODAL();
        },

        saveDraft() {
            const updateInfo = {
                articleTitle: this.articleTitle,
                articleContent: this.articleContent
            };
            this.UPDATE_CURRENT_DRAFT(updateInfo);
            this.TOGGLE_MODAL();
        },

        askCancel(event) {
            if (event.target === this.$refs.articleWrap)
                this.TOGGLE_CANCEL();
        },

        async publishArticle() {
            this.loading = true;

            this.publishDateUnix = Date.now();
            this.publishDate = new Date(this.publishDateUnix).toLocaleDateString('en-us', this.dateOptions);
            
            function getRandom(min, max) {
                return Math.random() * (max - min) + min;
            }

            this.viewsNumber = Math.floor(getRandom(500, 25000));
            this.votesNumber = Math.floor(getRandom(this.viewsNumber / 100, this.viewsNumber / 10));
            this.averageRating = (getRandom(20, 50) / 10).toFixed(2);

            const articleArray = {
                docId: this.docId,
                articleTitle: this.articleTitle,
                articleContent: this.articleContent,
                publishDateUnix: this.publishDateUnix,
                publishDate: this.publishDate,
                viewsNumber: this.viewsNumber,
                votesNumber: this.votesNumber,
                averageRating: this.averageRating,
            }

            this.SET_ARTICLE(articleArray);
            this.SET_CURRENT_ARTICLE(articleArray.docId);
            await this.ADD_ARTICLE_DB();
            this.UPDATE_CURRENT_DRAFT(null);
            this.TOGGLE_MODAL();

            this.loading = false;
        }
    },

    computed: {
        ...mapState(['currentDraft'])
    },

    created() {
        this.docId = uid(10);
        if (this.currentDraft) {
            this.articleTitle = this.currentDraft.articleTitle;
            this.articleContent = this.currentDraft.articleContent; 
        } 
    }
}
</script>


<style lang="scss" scoped>
.article-modal-wrap {
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0.1, 0.1, 0.1, 0.3);
    justify-content: center;
    align-items: center;

    .article-modal-content {
        width: 800px;
        min-height: 400px;
        background-color: #141625;
        color: #fff;

        @media screen and (min-width: 800px) {
            border-radius: 20px;
        }
        h4 {
            align-self: center;
            margin-top: 5px;
            font-size: 1.15rem;

            @media screen and (min-height: 600px) {
                margin-top: 7px;
                margin-bottom: 3px;
            }
            @media screen and (min-height: 800px) {
                margin-top: 10px;
                margin-bottom: 5px;
            }
            @media screen and (min-height: 1000px) {
                margin-top: 15px;
                margin-bottom: 8px;
            }
        }
        label {
            @media screen and (min-width: 360px) {
                margin-left: 10px;
            }
            @media screen and (min-height: 600px) {
                margin-top: 5px;
            }
            @media screen and (min-height: 800px) {
                margin-top: 7px;
                margin-bottom: 3px;
            }
            @media screen and (min-height: 1000px) {
                margin-top: 10px;
                margin-bottom: 5px;
            }
        }

        input, textarea {
            padding: 5px 0;
            resize: none;
            outline: none;
            border: none;
            background-color: #1e2139;
            color: #fff;
            font-size: 1rem;

            @media screen and (min-width: 360px) {
                margin: 0 7px;
                padding: 7px;
            }
            @media screen and (min-width: 500px) {
                margin: 0 9px;
                padding: 9px;
            }
            @media screen and (min-width: 768px) {
                margin: 0 10px;
                padding: 10px;
            }
            @media screen and (min-width: 1200px) {
                margin: 0 11px;
                padding: 11px;
            }
        }

        textarea {
            height: 60vh;
            max-height: 500px;
        }

        .buttons {
            margin: 10px 10px;

            button {
                cursor: pointer;
                padding: 12px 18px;
                border-radius: 14px;
                border: none;
                color: #fff;
            }

            .right {
                margin-left: auto;
                margin-right: 8px;
            }
        }
    }
}
</style>