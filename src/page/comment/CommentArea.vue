<template>
  <div>
    <div>
    <ul class="infinite-list" v-infinite-scroll="load" >
      <li v-for="i in count" class="infinite-list-item">
        <h3>这里是评论区组件</h3>

      </li>
    </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "comment-area",
      data () {
        return {
          count: 0
        }
      },
      methods: {
        load () {
          this.count += 2
        }
      }
    }
</script>

<style scoped>

</style>
