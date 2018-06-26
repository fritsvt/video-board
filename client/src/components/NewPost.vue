<template>
<div class="card">
    <h1 class="title">Submit a video</h1>
    <form @submit.prevent="verifyCaptcha">
        <div class="field">
        <label class="label">Youtube URL</label>
        <div class="control has-icons-left">
            <input @input="form.creating = true" v-model="form.data.youtube_url" :class="{ 'is-danger': form.errors.youtube_url }" class="input" type="url" placeholder="Youtube URL">
            <span class="icon is-small is-left">
            <i class="fas fa-link"></i>
            </span>
        </div>
        <p v-if="form.errors.youtube_url" class="help is-danger">{{form.errors.youtube_url[0]}}</p>
        </div>

        <transition name="slide">
        <div v-if="form.creating">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                  <input v-model="form.data.title" :class="{ 'is-danger': form.errors.title }" class="input" type="text" placeholder="Title">
              </div>
              <p v-if="form.errors.title" class="help is-danger">{{form.errors.title[0]}}</p>
            </div>
            <div class="field">
              <label class="label">Post body</label>
              <div class="control">
                  <textarea v-model="form.data.body"  :class="{ 'is-danger': form.errors.body }" class="textarea" placeholder="Post body" cols="30" rows="3"></textarea>
                  <span>{{form.data.body ? form.data.body.length : 0}} / 1000</span>
              </div>
              <p v-if="form.errors.body" class="help is-danger">{{form.errors.body[0]}}</p>
            </div>
            <button :data-sitekey="captchaKey" :data-callback="submitPost" type="submit" :class="{ 'is-loading': form.loading }" class="button is-primary is-fullwidth g-recaptcha">Submit video</button>
            <recaptcha ref="recaptcha" @verify="submitPost"></recaptcha>
        </div>
        </transition>
    </form>
</div>
      
</template>

<script>
import Recaptcha from "@/components/Recaptcha";

export default {
  components: {
    Recaptcha
  },
  name: "NewPost",
  data() {
    return {
      form: {
        creating: false,
        loading: false,
        data: {},
        errors: {}
      }
    };
  },
  methods: {
    verifyCaptcha() {
      this.form.loading = true;
      this.$refs.recaptcha.execute();
    },
    submitPost(gRecaptchaResponse) {
      this.form.data["g-recaptcha-response"] = gRecaptchaResponse;

      axios
        .post("posts/create", this.form.data)
        .then(res => {
          this.form.errors = {};
          this.form.loading = false;
          this.form.data = {};
          this.form.creating = false;
          this.$toast.open({
            message: "Your post has been submitted",
            type: "is-success"
          });
          this.$emit("getPosts");
        })
        .catch(err => {
          this.form.errors = err.response.data.errors;
          this.form.loading = false;
        });
    }
  },
  computed: {
    captchaKey() {
      return process.env.CAPTCHA_KEY;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  margin-top: 10px;
}
.title {
  margin: 10px 0 10px 0;
}
.slide-leave-active,
.slide-enter-active {
  transition: 200ms;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate(0, -5%);
}
</style>