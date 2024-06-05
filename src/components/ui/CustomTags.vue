<template>
  <div class="custom-tags">
    <div v-for="(tag, index) in tags" :key="index" class="tag">
      <span>{{ tag }}</span>
      <span @click="removeTag(index)" class="remove-tag">×</span>
    </div>
    <div class="input-area">
      <input
          v-model="newTag"
          @keydown.enter="addTag"
          type="text"
          class="new-tag-input"
          placeholder="New tag"
      />
      <button @click="addTag" class="add-tag-button">Add</button>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      newTag: ''
    };
  },
  methods: {
    ...mapActions(['addTags', 'removeTags']),
    addTag() {
      if (this.newTag.trim() !== '' && !this.tags.includes(this.newTag)) {
        this.addTags(this.newTag.trim());
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.removeTags(index);
    }
  },
  computed: {
    ...mapState(['tags'])
  }
};
</script>

<style scoped>
.custom-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1.5px rgba(128, 128, 128, 0.317) solid;
  border-radius: 5px;
  padding: 10px 5px
}

.tag {
  background-color: #e2e8f0;
  color: #2d3748;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
}

.remove-tag {
  cursor: pointer;
  margin-left: 0.5rem;
}

.new-tag-input {
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
}

.add-tag-button {
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border: none;
  background-color: #4a5568;
  color: #fff;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
