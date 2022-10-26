<template>
  <div class="tag">
    <p>
      {{ label }}
    </p>
    <button @click="remove" class="remove-btn">
      <CloseIcon />
    </button>
  </div>
</template>

<script>
import { CloseIcon } from '@/components/icons';

export default {
  name: 'BaseTag',

  emits: ['remove'],

  components: {
    CloseIcon,
  },

  props: {
    label: String,
  },

  methods: {
    remove() {
      this.$emit('remove');
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0px 5px;
  padding: 5px 5px;
  background-color: $primaryTrans;
  color: $secondaryColor;
  border-radius: 15px;

  p {
    margin: 0;
    text-align: center;
  }
}

.remove-btn {
  height: 15px;
  width: 15px;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;

  svg {
    width: 15px;
    height: 15px;

    fill: $secondaryColor;
    stroke: $secondaryColor;
  }
}
</style>
