<template>

  <div class="container">

    <div class="columns">
      <div class="column is-12-mobile is-8-tablet is-6-desktop is-offset-2-tablet is-offset-3-desktop">
        <new-post @getPosts="getPosts()"></new-post>

        <h3 class="recent-posts-title">Recent Posts</h3>

        <div class="posts">
          <b-notification v-if="loading" :closable="false">
            <p class="has-text-centered">loading posts</p>
            <b-loading :is-full-page="false" :active.sync="loading" :can-cancel="false"></b-loading>
          </b-notification>

          <template v-for="(post, index) in posts">
            <post-card :key="index" :post="post"></post-card>
          </template>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from "@/components/NewPost.vue";
import PostCard from "@/components/PostCard.vue";

export default {
  name: "home",
  components: {
    NewPost,
    PostCard
  },
  data() {
    return {
      loading: false,
      posts: []
    };
  },
  mounted() {
    this.getPosts();
    document.title = "Videoboard";
  },
  methods: {
    getPosts() {
      this.loading = true;
      axios.get("posts").then(res => {
        this.loading = false;
        this.posts = res.data.posts;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.recent-posts-title {
  margin-top: 10px;
  margin-bottom: -5px;
}
.posts {
  min-height: 50px;
}
</style>
