<template>
    <div class="delete-modal-wrap flex">
        <loading v-if="loading"/>
        <div class="delete-modal-content flex flex-column">
            <p>Are you sure you want to delete this article? You can't undo this action</p>
            <div class="buttons flex">
                <button @click="closeDelete" class="purple">Cancel</button>
                <button @click="deleteArticle" class="red">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"
import Loading from "../components/Loading.vue"

export default {
    components: {
        Loading
    },

    data: () => ({
        loading: null
    }),

    methods: {
        ...mapMutations(['TOGGLE_DELETE', 'DELETE_CURRENT_ARTICLE', 'DELETE_ARTICLE']),
        ...mapActions(['DELETE_ARTICLE_DB']),

        closeDelete() {
            this.TOGGLE_DELETE();
        },

        deleteArticle() {
            this.loading = true;
            this.DELETE_ARTICLE_DB();
            this.DELETE_ARTICLE();
            this.DELETE_CURRENT_ARTICLE();
            this.TOGGLE_DELETE();
            this.$router.push('/');
            this.loading = false;
        }
    },

    computed: {
        ...mapState(['articleData'])
    }
}
</script>

<style lang="scss" scoped>
.delete-modal-wrap {
    position: fixed;
    z-index: 103;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0.1, 0.1, 0.1, 0.8);

    .delete-modal-content {
        border-radius: 20px;
        max-width: 400px;
        height: 200px;
        padding: 18px 32px;
        justify-content: space-around;
        align-items: center;
        background-color: #141625;
        color: #fff;

        p {
            text-align: center;
        }

        .buttons {
            gap: 60px;

            button {
                flex: 1;
                padding: 12px 34px;
                border-radius: 14px;
                border: none;
                color: #fff;
            }
        }
    }
}
</style>