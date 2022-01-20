<template>
<header>
    <ul class="header-menu flex">
        <li><router-link class="nav-link" :to="{ name: 'Home' }">Home</router-link></li>
        <li @click="toggleModal" class="nav-link">Add article</li>
        <li class="sorter flex flex-column right">
            <div @click="toggleSorter" class="sorter-button nav-link flex">
                <span>Sort by {{sortingValue}}</span>
                <img src="@/assets/icon-arrow-down.svg">
            </div>
            <ul v-show="sorterMenu" class="sorter-menu">
                <li @click="sortArticles">Most Recent</li>
                <li @click="sortArticles">Most Popular</li>
                <li @click="sortArticles">Most Rated</li>
            </ul>
        </li>
    </ul>
</header>
    
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
    data: () => ({
        sorterMenu: false,
    }),

    methods: {
        ...mapMutations(['TOGGLE_MODAL', 'SORT_ARTICLES']),

        toggleModal() {
            this.TOGGLE_MODAL();
        },

        toggleSorter() {
            this.sorterMenu = !this.sorterMenu;
        },

        sortArticles(event) {
            this.sorterMenu = false;
            this.SORT_ARTICLES(event.target.innerHTML);
        }
    },


    computed: {
        ...mapState(['sortingValue'])
    }
}
</script>

<style lang="scss" scoped>
header {
    z-index: 100;
    width: 100vw;
    height: 60px;
    position: fixed;
    background-color: #141625;
    color: #fff;
    font-size: 1.2rem;
    align-items: center;

    .header-menu {
        padding: 15px 40px;
        gap: 16px;
        align-items: center;
        
        .nav-link {
            text-decoration: none;
            color: #fff;

            &:hover, &:hover * {
                text-decoration: underline;
                color: #e0626a;
            }
            &:active, &:active * {
                color: #f71120;
            }
        }
        > li {
            cursor: pointer;
        }

        .sorter {
            position: relative;
            align-items: center;
            justify-content: center;

            .sorter-button {
                align-items: center;

                img {
                    width: 15px;
                    margin-left: 12px;
                }
            }

            .sorter-menu {
                position: absolute;
                top: 40px;
                width: 130px;
                font-size: 1rem;
                background-color: #141625;
                box-shadow: 0 4px 6px -1px rbga(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                li {
                    padding: 10px 12px;

                    &:hover {
                        color: #141625;
                        background-color: #fff;
                    }
                }
            } 
        }
    }
}
</style>
