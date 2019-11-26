<template>
  <div id="app">
    <feedback-table />
  </div>
</template>

<script>
import FeedbackTable from "./components/smart-feedback";

export default {
  components: {
    FeedbackTable
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  height: 100%;
  font-size: 62.5%; /* sets 1rem to 10px */
}

body {
  font-size: 1.6rem; /* ~16px */
  margin: 0;
  font-family: "StagSansWeb-Book", "Verdana";
}

#app {
  display: flex;
  justify-content: center;
}
</style>
