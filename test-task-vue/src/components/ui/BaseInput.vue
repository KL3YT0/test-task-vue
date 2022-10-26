<template>
  <div class="input-wrapper">
    <!-- <slot name="tags" /> -->

    <div v-if="$slots['tags']" class="tags">
      <slot name="tags" />
    </div>

    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      @keydown.enter="onApply"
      placeholder="Начните вводить текст"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue', 'apply'],

  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
    },

    onApply() {
      if (this.modelValue) this.$emit('apply');
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  border: 2px solid $primaryColor;
  border-radius: 15px;
  padding: 8px 0px;

  input {
    width: 100%;
    border-radius: 25px;
    padding: 0px 10px;
    color: $primaryColor;
    font-size: 15px;
    font-weight: bold;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  input::placeholder {
    color: $secondaryColor;
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
  padding: 0px 10px;
  margin-bottom: 10px;
}
</style>
