<template>
    <div class="card post">
        <template v-if="showingVideo">
            <div class="columns">
                <div class="column is-12">
                    <div class="iframe">
                        <iframe width="100" height="350" :src="`https://www.youtube.com/embed/${post.youtube_id}?autoplay=1&rel=0`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </template>

        <div class="columns is-mobile">
            <div v-if="!showingVideo" class="column is-narrow">
                <div @click="showingVideo = true" class="video">
                    <img :src="`https://img.youtube.com/vi/${post.youtube_id}/2.jpg`" :alt="post.youtube_id">
                    <img class="youtube-icon" src="youtube.svg" alt="youtube icon">
                </div>
            </div>
            <div class="column">
                <h3>{{post.title}} <span class="timestamp"> - {{timestamp}}</span></h3>
                <p class="post-body" v-if="post.body">{{postBody}}</p>
                <router-link :to="`/post/${post.id}`">{{post.comments_count}} {{post.comments_count === 1 ? 'reply' : 'replies'}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
  data() {
    return {
      showingVideo: false
    };
  },
  computed: {
    postBody() {
      if (this.post.body.length < 150) {
        return this.post.body;
      }

      return this.post.body.substr(0, 150) + "...";
    },
    timestamp() {
      return moment.utc(this.post.created_at).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  padding: 10px 10px 0 10px;
  margin-top: 10px;
  word-wrap: break-word;

  h3 {
    padding: 0;
    margin: 0;
    font-size: 1.5em;

    .timestamp {
      font-size: 12px;
    }
  }

  .post-body {
    white-space: pre-wrap;
  }

  iframe {
    height: 350px;
    width: 100%;
  }

  .video {
    width: 120px;
    height: 90px;

    img {
      border-radius: 5px;
      cursor: pointer;
    }
    .youtube-icon {
      position: absolute;
      height: 30px;
      left: 60px;
      top: 40px;
    }
  }

  .columns {
    margin-bottom: 0;
  }
}
</style>
