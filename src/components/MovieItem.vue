<template>
    <div>
        <h2 @click="$emit('movie-clicked', movie.id)">{{movie.title}}</h2>
        <h3 @click="$emit('movie-edit', movie.id)">U</h3>
        <h3 @click="$emit('movie-delete', movie.id)">D</h3>
    </div>
</template>

<script>
export default {
    name: 'MovieItem',
    props: ['movie']
}
</script>

<style scoped>
div {
    display: flex;
    justify-content: space-around;
    
}
    h2 {
        cursor: pointer;
    }

    h3 {
    cursor: pointer
    }
</style>