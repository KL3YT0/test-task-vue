<template>
  <div class="list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardList',
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
