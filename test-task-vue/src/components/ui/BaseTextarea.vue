<template>
  <textarea
    ref="textarea"
    @input="onInput"
    :value="modelValue"
    :placeholder="String(placeholder)"
    :readonly="notEditable ? true : false"
  />
</template>

<script>
export default {
  name: 'TheCard',

  components: {},

  emits: ['update:modelValue'],

  props: {
    placeholder: {
      type: String,
      default: '',
    },

    modelValue: {
      type: String,
      default: '',
    },

    notEditable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  mounted() {
    this.onInput();
  },

  methods: {
    onInput(e) {
      const textarea = this.$refs.textarea;
      if (textarea) {
        textarea.style.height = 'auto';

        let height = textarea.scrollHeight;
        height = Math.trunc(height / 20) * 20;

        textarea.style.height = `${height}px`;
      }

      if (e) {
        this.$emit('update:modelValue', e.target.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  padding: 20px 10px;
  border: 2px solid $primaryColor;
  border-radius: 15px;
  width: 100%;
  color: $primaryColor;
  font-size: 15px;
  font-weight: bold;
  outline: none;
  box-sizing: border-box;
  line-height: 20px;
  font-size: 16px;
  overflow: hidden;
}
</style>
