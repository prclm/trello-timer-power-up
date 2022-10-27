import type { Ref } from "vue";
import { ref, computed } from "vue";
import type Task from "./useTask";
import useTask from "./useTask";

export default function useTimer() {
  const tasks: Ref<typeof Task[]> = ref([]);

  const start = (desc: string = "") => {
    stop();
    const task = useTask();
    task.start(desc);
    tasks.value.push(task);
  };

  const stop = () => {
    currentTask.value?.stop();
  };

  const reset = () => {
    tasks.value = [];
  };

  const restore = (newTasks: Array) => {
    newTasks.forEach((taskItem: Object) => {
      const newTask = useTask();
      newTask.create(
        taskItem.startTime,
        taskItem.endTime,
        taskItem.description
      );
      tasks.value.push(newTask);
    });
  };

  const remove = (task: typeof Task) => {
    tasks.value = tasks.value.filter((t) => t !== task);
  };

  const currentTask = computed(() => {
    if (tasks.value.length === 0) return null;
    if (tasks.value[tasks.value.length - 1].isRunning) {
      return tasks.value[tasks.value.length - 1];
    }
    return null;
  });

  return {
    tasks,
    start,
    stop,
    reset,
    remove,
    restore,
    currentTask,
  };
}
