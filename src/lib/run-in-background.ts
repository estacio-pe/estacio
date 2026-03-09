export const runInBackground = async <T>(fn: () => Promise<T>) => {
  fn().catch((err) => {
    console.error("Error in background function:", err);
  });
};
