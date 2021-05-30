<template>
    <div class="headerWrapper">
        <p class="title">{{title}}</p>
        <p v-if="!simple" class="link" @click="$emit('clicked')">Show all</p>
    </div>
</template>

<script>
export default {
    name: 'GridHeader',
    props: ['title', 'simple']
}
</script>

<style scoped>
    .headerWrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 20px;
    }

    .title {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
    }

    .link {
        font-size: 16px;
        color:rgb(45, 115, 182);
        cursor: pointer;
        margin: 0;
    }

    .link:hover{
        font-weight: bold;
    }

</style>