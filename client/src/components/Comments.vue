<template>
    <div>
        <template v-for="(comment, index) in comments">
            <div class="card" :class="{first: offset === '0'}" :key="index">
                <comment :comment="comment" :offset="offset"></comment>
                <comments v-if="comment.comments" :comments="comment.comments" :offset="Number(offset) + 15"></comments>
            </div>
        </template>
    </div>
</template>

<script>
import Comment from "./Comment";

export default {
  name: "comments",
  props: ["comments", "offset"],
  components: {
    Comment
  }
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: none;
  margin-top: 10px;
  overflow-x: auto;
  overflow-y: hidden;

  &.first {
    padding: 10px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }
}
</style>
