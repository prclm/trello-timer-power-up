<template>
  <div class="timer-control">
    <div>
      <ul class="task-list">
        <TaskItem
          :item="task"
          :index="index"
          v-for="(task, index) in tasks"
          :key="index"
        >
          <template v-slot:actions>
            <button class="mod-badge">
              <Icon name="edit" />
              <span class="visually-hidden">Edit</span>
            </button>
            <button
              class="mod-danger mod-badge"
              @click="
                remove(task);
                saveTasks();
              "
            >
              <Icon name="eject" />
              <span class="visually-hidden">Entfernen</span>
            </button>
          </template>
        </TaskItem>
      </ul>
    </div>
    <form ref="form" @submit="submitForm" @reset="resetForm">
      <input
        ref="inputTask"
        v-model="modelTask"
        type="text"
        name="task"
        :placeholder="placeholderTask"
      />
      <button
        type="submit"
        class="btn--start mod-primary"
        :disabled="modelTask === ''"
      >
        <Icon name="play" />
        <span class="visually-hidden">Start</span>
      </button>
      <button
        :disabled="!currentTask?.isRunning"
        type="button"
        @click="
          stop();
          saveTasks();
        "
        class="btn--stop mod-danger"
      >
        <Icon name="stop" />
        <span class="visually-hidden">Stop</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, watch } from "vue";
import Icon from "./Icon.vue";
import useTimer from "@/composables/useTimer";
import TaskItem from "./TaskItem.vue";

const { tasks, currentTask, start, stop, remove, restore } = useTimer();
const form = ref();
const inputTask = ref();
const modelTask = ref("");
const placeholderTask = "Starte was Neues ...";
const t = inject("TrelloPowerUp_iframe");

const submitForm = (e: Event): void => {
  e.preventDefault();
  stop();
  let data = new FormData(form.value);
  start(data.get("task")?.toString() || placeholderTask);
  saveTasks();
  form.value.reset();
};

const resetForm = (): void => {
  modelTask.value = "";
  form.value.reset();
};

onMounted(() => {
  inputTask.value.focus();
  t?.get("card", "shared", "tasks").then((cardTasks) => {
    if (cardTasks) {
      console.log("restore tasks", cardTasks);
      restore(cardTasks);
    }
  });
});

const saveTasks = (): void => {
  console.log("saveTasks");
  t?.set("card", "shared", "tasks", tasks.value);
};
</script>

<style scoped lang="scss">
form,
.form-inner {
  display: flex;
  align-items: stretch;
  gap: 0.3rem;
}

input,
button {
  margin: 0;
}

input[name="task"] {
  max-width: unset;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
}

button.mod-badge {
  border-radius: 50%;
  aspect-ratio: 1;
  padding: 0 0.3em;
}
</style>
