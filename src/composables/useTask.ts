import type { Ref, ComputedRef } from "vue";
import { ref, computed, watchEffect } from "vue";

export default function useTask() {
  const isRunning: ComputedRef<boolean> = computed(
    () => startTimestamp.value !== null && endTimestamp.value === null
  );
  const description: Ref<string> = ref("");
  const startTimestamp: Ref<null | number> = ref(null);
  const endTimestamp: Ref<null | number> = ref(null);
  const durCount: Ref<number> = ref(0);

  const duration: ComputedRef<number> = computed(() => {
    if (startTimestamp.value === null) {
      return 0;
    }
    if (endTimestamp.value === null) {
      return Math.floor(durCount.value / 1000);
    }
    return Math.floor((endTimestamp.value - startTimestamp.value) / 1000);
  });

  const startTime: ComputedRef<number | null> = computed(() => {
    if (startTimestamp.value === null) return null;
    return startTimestamp.value;
    // return new Date(startTimestamp.value).toLocaleTimeString();
  });

  const endTime: ComputedRef<number | null> = computed(() => {
    if (endTimestamp.value === null) return null;
    return endTimestamp.value;
    // return new Date(endTimestamp.value).toLocaleTimeString();
  });

  const start = (desc: string = ""): void => {
    description.value = desc;
    startTimestamp.value = Date.now();
  };

  const stop = (): void => {
    endTimestamp.value = Date.now();
  };

  const create = (start: number, end: number, desc: string): void => {
    startTimestamp.value = start;
    endTimestamp.value = end;
    description.value = desc;
  };

  watchEffect(() => {
    const interval = setInterval(() => {
      if (isRunning.value) {
        durCount.value = Date.now() - startTimestamp.value!;
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return {
    description,
    startTime,
    endTime,
    duration,
    isRunning,
    stop,
    start,
    create,
  };
}
export type Task = ReturnType<typeof useTask>;
