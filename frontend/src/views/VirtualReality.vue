<script setup>
    import { onMounted } from 'vue';
    import { useBooksStore } from '@/store/books';
    onMounted(() => {
        mybooks.getBook();
    });
    const mybooks = useBooksStore();
</script>
 
<template>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">ISBN</th>
            <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in mybooks.books" :key="item.book_id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.isbn13 }}</td>
            <td>@mdo</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>