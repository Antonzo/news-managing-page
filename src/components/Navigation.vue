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
    width: 100%;
    height: 45px;
    position: fixed;
    background-color: #141625;
    color: #fff;
    font-size: 1.15rem;
    align-items: center;

    @media screen and (min-width: 500px) {
        height: 55px;
    }
    @media screen and (min-width: 768px) {
        height: 60px;
        font-size: 1.2rem;
    }
    @media screen and (min-width: 1200px) {
        height: 65px;
        font-size: 1.25rem;
    }

    .header-menu {
        padding: 10px 10px;
        gap: 8px;
        align-items: center;
        
        @media screen and (min-width: 500px) {
            gap: 12px;
            padding: 15px 20px;
        }
        @media screen and (min-width: 768px) {
            gap: 15px;
            padding: 15px 25px;
        }
        @media screen and (min-width: 1200px) {
            gap: 18px;
            padding: 15px 40px;
        }

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
                    margin-left: 5px;

                    @media screen and (min-width: 500px) {
                        width: 18px;
                        margin-left: 8px;
                    }
                    @media screen and (min-width: 768px) {
                        width: 21px;
                        margin-left: 9px;
                    }
                    @media screen and (min-width: 1200px) {
                        width: 24px;
                        margin-left: 11px;
                    }
                }
            }

            .sorter-menu {
                position: absolute;
                top: 35px;
                width: 130px;
                font-size: 1rem;
                background-color: #141625;
                box-shadow: 0 4px 6px -1px rbga(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                @media screen and (min-width: 500px) {
                    top: 40px;
                    width: 140px;
                }
                @media screen and (min-width: 768px) {
                    top: 45px;
                    width: 150px;
                }
                @media screen and (min-width: 1200px) {
                    top: 50px;
                    width: 155px;
                }

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
