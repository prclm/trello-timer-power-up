<template>
  <span class="clock-item">
    <span v-if="hour">{{ hour }}<small>h</small></span>
    <span v-if="min">{{ min }}<small>m</small></span>
    <span v-if="sec">{{ sec }}<small>s</small></span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  seconds: number;
}>();

const sec = computed(() => Math.floor(props.seconds) % 60);
const min = computed(() => Math.floor(props.seconds / 60) % 60);
const hour = computed(() => Math.floor(props.seconds / 3600));
</script>

<style scoped>
.clock-item {
  font-weight: bold;
  letter-spacing: 0.1em;
}
</style>
