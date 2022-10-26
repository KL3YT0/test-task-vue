<template>
  <div class="card">
    <button @click="switchEditMode" class="edit-btn">
      <EditIcon />
    </button>

    <div class="content">
      <div>
        <p class="caption">Название</p>
        <BaseTextarea
          :model-value="titleEdit"
          @update:model-value="updateTitle"
          :not-editable="!editMode"
        />
      </div>

      <div>
        <p class="caption">Содержание</p>
        <BaseTextarea
          :model-value="articleEdit"
          @update:model-value="updateArticle"
          :not-editable="!editMode"
        />
      </div>
    </div>

    <div v-if="editMode" class="actions">
      <BaseButton @click="save" label="Сохранить" />
      <BaseButton @click="remove" label="Удалить" />
    </div>
  </div>
</template>

<script>
import { BaseButton, BaseTextarea } from '@/components/ui';
import { EditIcon } from '@/components/icons';

export default {
  name: 'TheCard',

  components: {
    EditIcon,
    BaseButton,
    BaseTextarea,
  },

  emits: ['save', 'remove'],

  props: {
    id: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      default: '',
    },

    article: {
      type: String,
      default: '',
    },

    keyword: String,

    url: String,
  },

  data() {
    return {
      editMode: false,
      titleEdit: this.title,
      articleEdit: this.article,
    };
  },

  methods: {
    updateTitle(value) {
      this.titleEdit = value;
    },

    updateArticle(value) {
      this.articleEdit = value;
    },

    save() {
      this.$emit('save', {
        id: this.id,
        title: this.titleEdit,
        article: this.articleEdit,
        keyword: this.keyword,
        url: this.url,
      });

      this.editMode = false;
    },

    remove() {
      this.$emit('remove', this.id);

      this.editMode = false;
    },

    switchEditMode() {
      this.editMode = !this.editMode;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 25px;
  position: relative;
  border: 1px solid $primaryTrans;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;

  svg {
    stroke: $primaryTrans;
  }
}

.caption {
  color: $primaryTrans;
  font-weight: bold;
  margin: 10px 0px 5px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 12px 0px;
}

.actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}
</style>
