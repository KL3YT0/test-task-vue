<template>
  <div>
    <h2 class="title">Форма</h2>

    <p class="caption">Выберите биржу:</p>
    <BaseSelect v-model="form.source" :options="sourcesOptions" />

    <p class="caption">
      Введите ключевые слова и нажмите Enter. В случае отсутствия результатов,
      попробуйте обновить данные спустя некоторое время (возможно они еще не
      сформировались):
    </p>
    <base-input
      :model-value="keyword"
      @update:model-value="updateKeyword"
      @apply="applyKeyword"
    >
      <template #tags v-if="form.keywords.length">
        <BaseTag
          v-for="(tag, idx) in form.keywords"
          :key="idx"
          :label="tag"
          @remove="removeKeywordByIdx(idx)"
        />
      </template>
    </base-input>

    <BaseButton
      @click="applyForm"
      :disabled="!formIsReady"
      label="Применить"
      class="apply-btn"
    />
  </div>
</template>

<script>
import { BaseSelect, BaseInput, BaseTag, BaseButton } from '@/components/ui';

export default {
  name: 'ParseForm',

  components: { BaseSelect, BaseInput, BaseTag, BaseButton },

  props: {},

  emits: ['apply'],

  data() {
    return {
      form: {
        source: '',
        keywords: ['spring', 'boot', 'hibernate'],
      },

      keyword: '',

      sourcesOptions: [
        { key: 1, value: 'freelance' },
        { key: 2, value: 'kwork' },
        { key: 3, value: 'выбрать все' },
      ],
    };
  },

  methods: {
    removeKeywordByIdx(idx) {
      this.form.keywords.splice(idx, 1);
    },

    updateKeyword(value) {
      this.keyword = value;
    },

    applyKeyword() {
      const exist = this.form.keywords.some(
        (keyword) => keyword === this.keyword
      );

      if (exist) {
        return;
      }

      this.form.keywords.push(this.keyword);
      this.keyword = '';
    },

    applyForm() {
      const form = { keywords: this.form.keywords.join(';'), sources: [] };

      form.sources = this.form.source === 3 ? [1, 2] : [this.form.source];

      this.$emit('apply', form);
    },
  },

  computed: {
    formIsReady() {
      return this.form.keywords.length > 0 && this.form.source;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: $primaryColor;
  text-align: center;
}

.caption {
  color: $primaryTrans;
  font-weight: bold;
  margin: 25px 0px 5px;
}

.apply-btn {
  margin: auto;
  margin-top: 15px;
}
</style>
