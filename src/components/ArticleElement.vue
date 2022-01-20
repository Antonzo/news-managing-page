<template>
    <div class="article-element-container flex flex-column">
        <h4>{{ articleTitle }}</h4>
        <p>{{ shortContent }}</p>
        <div class="article-link flex">
            <router-link class="router-link" :to="{name: 'Article', params: { docId }}"> 
                Read futher
            </router-link>
        </div>
        <div class="info-container flex bottom">
            <div class="info-sub-container flex">
                <img src="@/assets/icon-eye.svg">
                <span>{{ viewsNumberPrint }}</span>
            </div>
            <div class="info-sub-container flex">
                <img src="@/assets/icon-star.svg">
                <span>{{ averageRating }}</span>
            </div>
            <div class="flex right">
                {{ publishDate }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['docId', 'articleTitle', 'articleContent', 'publishDate', 'viewsNumber', 'votesNumber', 'averageRating'],

    computed: {
        shortContent() {
            const lastSpace = this.articleContent.lastIndexOf(' ', 396);
            return this.articleContent.substr(0, lastSpace) + '...';
        },

        viewsNumberPrint() {
            return this.viewsNumber >= 1000 ? (this.viewsNumber / 1000).toFixed(1) + 'k' : this.viewsNumber;
        }
    }
}
</script>

<style lang="scss" scoped>
.article-element-container {
    width: 350px;
    height: 500px;
    margin: 30px 30px;
    border-radius: 14px;
    background-color: #141625;
    color: #fff;

    h4 {
        margin: 10px 10px 0;
        text-align: center;
    }
    p {
        margin: 20px 10px 0;
        padding-top: 5px;
        border-top: 2px solid #fff;
    }
    .article-link {
        margin: 10px 10px 0;
        align-items: center;
        justify-content: center;
        padding-bottom: 5px;
        border-bottom: 2px solid #fff;

        .router-link {
            text-decoration: none;

            &:link {
                color: #3102eb;
            }

            &:visited {
                color: #aa97f5
            }

            &:hover {
                color: #e0626a;
                text-decoration: underline;
            }

            &:active {
                color: #f71120;
            }
        }
    }
    .info-container {
        margin: auto 10px 20px;
        gap: 10px;
        
        .info-sub-container  {
            align-items: center;
            justify-content: center;
            gap: 4px;

            img {
                width: 20px;
            }
        }
    }
}
</style>
