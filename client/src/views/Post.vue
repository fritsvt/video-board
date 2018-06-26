<template>
  <div class="container">

    <div class="columns">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li class="is-active"><a href="#" aria-current="page">{{ !post || loading ? 'Not found' : post.title }}</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <template v-if="post">
      <div class="columns">
        <div class="column is-8-tablet is-6-desktop">
          <h1 class="title">{{post.title}}</h1>
          <p class="author">Posted {{timestamp}}</p>
          <iframe width="100%" height="400" :src="`https://www.youtube.com/embed/${post.youtube_id}?rel=0`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          <p class="post-body">{{post.body}}</p>
        </div>
      </div>

      <div class="columns">
        <div class="column is-12-mobile is-10-desktop">
          <template v-if="post && !loading">
            <p>Reply to this post</p>
            <reply-comment :post="post.id"></reply-comment>

            <p>Replies</p>
            <comments :comments="post.comments" offset="0"></comments>
          </template>
        </div>
      </div>
    </template>

    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import Comments from "@/components/Comments";
import ReplyComment from "@/components/ReplyComment";

export default {
  components: {
    Comments,
    ReplyComment
  },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      axios
        .get(`comments/${this.$route.params.id}`)
        .then(res => {
          this.loading = false;
          this.$store.dispatch("setPost", res.data.post);
          document.title = this.post ? this.post.title : "not found";
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
        });
    }
  },
  computed: {
    post() {
      return this.$store.state.post.post;
    },
    timestamp() {
      return moment.utc(this.post.created_at).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.author {
  margin-bottom: 10px;
}
nav {
  margin-top: 10px;
}
.post-body {
  white-space: pre-wrap;
}
.title {
  margin-bottom: 0 !important;
}
</style>
