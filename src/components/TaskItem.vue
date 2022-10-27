<template>
  <div class="task-item">
    <div class="desc">{{ item.description }}</div>
    <div class="dur"><Clock :seconds="item.duration" /></div>
    <div class="time">
      <span>Start: {{ format(item.startTime) }}</span>
      <span v-if="item.endTime"> - Ende: {{ format(item.endTime) }}</span>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from "@/composables/useTask";
import Clock from "./Clock.vue";
import moment from "moment";
defineProps<{
  item: Task;
  index: number;
}>();

const format = (timestamp: number) => {
  return moment(timestamp).format("DD.MM.YYYY HH:mm:ss");
};
</script>

<style scoped lang="scss">
$border-radius: 4px;
.task-item {
  border-radius: $border-radius;
  display: flex;
  //   display: grid;
  //   grid-area-template: "desc dur actions" "time time actions";
  align-items: center;
  gap: 0.5em;
  padding: 0.25em 0.5em;

  .desc {
    grid-area: desc;
    font-size: 1.1em;
  }

  .dur {
    grid-area: dur;
  }

  .time {
    grid-area: time;
    color: #999;
  }
  .actions {
    grid-area: actions;
    opacity: 0;
    margin-left: auto;
    transition: opacity 0.2s ease-in-out;
    display: flex;
    gap: 0.25em;
  }
  &:hover {
    background: var(--ds-background-neutral, #091e420a);
    .actions {
      opacity: 1;
    }
  }
}
</style>
