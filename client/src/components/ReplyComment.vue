<template>
    <div class="columns">
        <div class="column is-12-mobile is-8-tablet is-4-desktop">
            <form @submit.prevent="verifyCaptcha">
                <p v-if="form.errors['g-recaptcha-response']" class="has-text-danger">Sorry, your post has been blocked by recpatcha</p>
                <div class="field">
                    <label class="label"></label>
                    <div class="control">
                        <textarea v-model="form.data.body"  :class="{ 'is-danger': form.errors.body }" class="textarea" placeholder="Your reply" cols="30" rows="3"></textarea>
                        <p v-if="form.errors.body" class="help is-danger">{{form.errors.body[0]}}</p>
                        
                        <div class="bottom-bar">
                            <span>{{form.data.body ? form.data.body.length : 0}} / 1000</span>
                            <button type="submit" :class="{ 'is-loading': form.loading }" class="button is-primary">Post reply</button>
                            <recaptcha ref="recaptcha" @verify="submitReply"></recaptcha>
                        </div>
                    </div>
                </div>
            </form>
        </div> 
    </div>
</template>

<script>
import Recaptcha from "./Recaptcha";

export default {
  name: "ReplyComment",
  props: ["parent", "post"],
  components: {
    Recaptcha
  },
  data() {
    return {
      form: {
        loading: false,
        errors: {},
        data: {
          post_id: this.post,
          parent_comment_id: this.parent,
          body: "",
          "g-recaptcha-response": ""
        }
      }
    };
  },
  methods: {
    verifyCaptcha() {
      this.form.loading = true;
      this.$refs.recaptcha.execute();
    },
    submitReply(gRecaptchaResponse) {
      this.form.data["g-recaptcha-response"] = gRecaptchaResponse;

      axios
        .post("comments/create", this.form.data)
        .then(res => {
          this.form.loading = false;
          this.form.errors = {};
          this.form.data.body = "";

          this.getPost();
          this.$emit("commentPosted");
        })
        .catch(err => {
          console.error(err);
          this.form.loading = false;
          this.form.errors = err.response.data.errors;
        });
    },
    getPost() {
      axios
        .get(`comments/${this.$route.params.id}`)
        .then(res => {
          this.$store.dispatch("setPost", res.data.post);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  margin-left: auto;
  margin-right: 0;
}
.bottom-bar {
  display: flex;
  margin-top: 4px;
}
</style>

