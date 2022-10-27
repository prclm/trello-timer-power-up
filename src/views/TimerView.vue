<template>
  <div>
    <div ref="wrapper" id="wrapper-view">
      <TimerControl />
      <!-- {{ isTrello ? "Trello iframe" : "local" }} -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, provide } from "vue";
import TimerControl from "@/components/TimerControl.vue";

// eslint-disable-next-line no-undef
const t = TrelloPowerUp.iframe();
const isTrello = computed(() => t.getContext() !== undefined);
const wrapper = ref<HTMLElement>();
provide("TrelloPowerUp_iframe", t);

function resizeIframe() {
  if (wrapper.value) {
    t.sizeTo(wrapper.value);
  }
}

onMounted(() => {
  resizeIframe();
  const resizeObserver = new ResizeObserver(resizeIframe);
  if (wrapper.value) {
    resizeObserver.observe(wrapper.value);
  }
});
watchEffect(() => {
  resizeIframe();
});
</script>

<style scoped>
#wrapper-view {
  overflow: hidden;
}
</style>
