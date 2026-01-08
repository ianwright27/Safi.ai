export function getCurrentDay() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
}
