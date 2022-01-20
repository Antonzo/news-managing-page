<template>
    <div class="cancel-modal-wrap flex">
        <div class="cancel-modal-content flex flex-column">
            <p>Are you sure you want to exit? Your changes will not be saved.</p>
            <div class="buttons flex">
                <button @click="closeCancel" class="purple">Return</button>
                <button @click="closeModal" class="red">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
    methods: {
        ...mapMutations(['TOGGLE_MODAL', 'TOGGLE_CANCEL', 'UPDATE_CURRENT_DRAFT']),

        closeCancel() {
            this.TOGGLE_CANCEL();
        },

        closeModal() {
            this.UPDATE_CURRENT_DRAFT(null);
            this.TOGGLE_CANCEL();
            this.TOGGLE_MODAL();
        }
    }
}
</script>

<style lang="scss" scoped>
.cancel-modal-wrap {
    position: fixed;
    z-index: 101;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0.1, 0.1, 0.1, 0.8);

    .cancel-modal-content {
        min-width: 200px;
        width: 100%;
        max-width: 400px;
        min-height: 150px;
        height: 20%;
        max-height: 250px;
        padding: 18px 32px;
        justify-content: space-around;
        align-items: center;
        background-color: #141625;
        color: #fff;

        @media screen and (min-width: 400px) {
            border-radius: 20px;
        }
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
