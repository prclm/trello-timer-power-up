<template>
  <Icon v-if="icon" :icon="icon" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import playerPlay from "@iconify-icons/tabler/player-play";
import playerStop from "@iconify-icons/tabler/player-stop";
import playerPause from "@iconify-icons/tabler/player-pause";
import playerEject from "@iconify-icons/tabler/player-eject";
import pencilIcon from "@iconify-icons/tabler/pencil";

const props = defineProps<{
  name: "play" | "stop" | "pause" | "eject" | "edit";
}>();

const icon = computed(() => {
  switch (props.name) {
    case "play":
      return playerPlay;
    case "stop":
      return playerStop;
    case "pause":
      return playerPause;
    case "eject":
      return playerEject;
    case "edit":
      return pencilIcon;
    default:
      return null;
  }
});
</script>

<style scoped></style>
