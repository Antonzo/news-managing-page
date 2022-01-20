import Vue from 'vue'
import Vuex from 'vuex'
import db from "../firebase/firebaseInit"
import { getDocs, setDoc, deleteDoc, doc, collection } from "firebase/firestore"; 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articlesUploaded: null,
    modalActive: null,
    cancelActive: null,
    deleteActive: null,
    deleteProcessing: null,
    articlesData: [],
    currentDraft: null,
    currentArticleArray: null,
    sortingParam: 'Most Recent', // Most Recent, Most Popular, Most Rated
    sortingValue: 'novelty' // novelty, popularity, rating
  },

  mutations: {
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },

    TOGGLE_CANCEL(state) {
      state.cancelActive = !state.cancelActive;
    },

    TOGGLE_DELETE(state) {
      state.deleteActive = !state.deleteActive;
    },

    UPDATE_CURRENT_DRAFT(state, draftArray) {
      if (!state.currentDraft)
        state.currentDraft = {
          articleTitle: null,
          articleContent: null
        };
      
      if (!draftArray)
        state.currentDraft = null;
      else {
        state.currentDraft.articleTitle = draftArray.articleTitle;
        state.currentDraft.articleContent = draftArray.articleContent;
      }
    },

    SET_CURRENT_ARTICLE(state, articleId) {
      state.currentArticleArray = state.articlesData.filter(article => article.docId === articleId)[0];
    },

    DELETE_CURRENT_ARTICLE(state) {
      state.currentArticleArray = null;
    },

    SET_ARTICLE(state, articleArray) {
      state.articlesData.push(articleArray);
    },

    DELETE_ARTICLE(state) {
      state.articlesData = state.articlesData.filter(article => article.docId !== state.currentArticleArray.docId);
    },

    SORT_ARTICLES(state, sortParam) {
      let articleField = '';
      if (sortParam === 'Most Recent') {
        articleField = 'publishDateUnix';
        state.sortingValue = 'novelty';
      }
      else if (sortParam === 'Most Popular') {
        articleField = 'viewsNumber';
        state.sortingValue = 'popularity';
      }
      else if (sortParam === 'Most Rated') {
        articleField = 'averageRating'
        state.sortingValue = 'rating';
      }

      state.articlesData.sort(function(article1, article2){
        return parseFloat(article2[articleField]) - parseFloat(article1[articleField])
      });
    },

    ARTICLES_UPLOADED(state) {
      state.articlesUploaded = true;
    }
  },

  actions: {
    async ADD_ARTICLE_DB({state}) {
      await setDoc(doc(db, "news", state.currentArticleArray.docId), state.currentArticleArray);
    },

    async GET_ARTICLES_DB({state, commit}) {
      const results = await getDocs(collection(db, "news"));
      results.forEach(doc => {
        if (!state.articlesData.some(article => article.docId === doc.id)){
          const data = {
            docId: doc.id,
            articleTitle: doc.data().articleTitle,
            articleContent: doc.data().articleContent,
            publishDateUnix: doc.data().publishDateUnix,
            publishDate: doc.data().publishDate,
            viewsNumber: doc.data().viewsNumber,
            votesNumber: doc.data().votesNumber,
            averageRating: doc.data().averageRating
          }
          commit('SET_ARTICLE', data);
        }
      })
      commit('ARTICLES_UPLOADED');
    },

    async DELETE_ARTICLE_DB({state}) {
      await deleteDoc(doc(db, "news", state.currentArticleArray.docId));
    }
  },

  modules: {
  }
})