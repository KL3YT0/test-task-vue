<template>
  <button
    class="button"
    :disabled="disabled"
    :class="{ button_disabled: disabled }"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    label: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  display: block;
  background-color: $primaryColor;
  color: $secondaryColor;
  font-weight: bold;
  cursor: pointer;
}

.button_disabled {
  background-color: $primaryTrans;
  cursor: not-allowed;
}
</style>
