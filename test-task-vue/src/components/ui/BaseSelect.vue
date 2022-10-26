<template>
  <div v-click-out="closeOptions" class="select">
    <div @click="switchOptions" class="head">
      <div class="head__label">
        {{ label }}
      </div>
      <ArrowIcon class="head__icon" :class="{ head__icon_turn: isOpen }" />
    </div>

    <div class="list" :class="{ list_open: isOpen }">
      <div
        v-for="option in options"
        :key="option.key"
        @click="selectOption(option.key)"
        class="list__item"
      >
        {{ option.value }}
      </div>
    </div>
  </div>
</template>

<script>
import ArrowIcon from '@/components/icons/ArrowIcon.vue';

export default {
  name: 'BaseSelect',

  components: { ArrowIcon },

  props: {
    options: {
      type: Array,
      default: () => [],
      required: true,
    },

    modelValue: {
      type: [String, Number],
      default: '',
      required: true,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    switchOptions() {
      this.isOpen = !this.isOpen;
    },

    closeOptions() {
      this.isOpen = false;
    },

    selectOption(key) {
      this.$emit('update:modelValue', key);
      this.closeOptions();
    },
  },

  computed: {
    label() {
      return this.options.find((o) => o.key === this.modelValue)?.value ?? '--';
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
  position: relative;
  border-radius: 15px;
  background-color: $primaryColor;
  color: $secondaryColor;
}

.head {
  padding: 8px;
  text-align: center;
  font-size: 20px;

  &__icon {
    position: absolute;
    right: 5px;
    top: calc(50% - 12.5px);
    width: 25px;
    height: 25px;
    padding: 0;
    background: none;
    border: none;
    fill: $secondaryColor;
  }

  &__icon_turn {
    transform: rotate(180deg);
  }
}

.list {
  position: absolute;
  display: none;
  flex-direction: column;
  gap: 8px 0px;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 15px;
  background-color: $primaryColor;

  &_open {
    display: flex;
  }

  &__item {
    padding: 5px;
    border-radius: 100px;
    color: $secondaryColor;
    font-size: 20px;
    cursor: pointer;
  }

  &__item:hover {
    opacity: 0.5;
    background-color: $primaryColor;
  }
}
</style>
