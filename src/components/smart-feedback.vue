<template>
  <div class="smart-feedback">
    <h1 class="feedback-header">Smart Feedback</h1>

    <div class="search-row">
      <pn-datepicker label="Select a date"></pn-datepicker>

      <pn-select placeholder="Select mood">
        <pn-option value="positive">Positive</pn-option>
        <pn-option value="mixed">Mixed</pn-option>
        <pn-option value="negative">Negative</pn-option>
      </pn-select>
    </div>

    <ul>
      <li v-for="(review, i) in reviews" :key="i">
        <p>{{ review.reviewText }}</p>
        <p>{{ review.sentiment }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    reviews: [],
    search: ""
  }),
  methods: {
    async fetchSentiments() {
      fetch(
        "https://rknjrmkbz9.execute-api.eu-west-1.amazonaws.com/dev/get/feedback",
        {
          method: "post",
          mode: "no-cors",
          body: JSON.stringify({
            sentiment: "NEGATIVE",
            since: "2018"
          })
        }
      )
        .then(function(response) {
          if (response.status !== 200) {
            // eslint-disable-next-line no-console
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          // Examine the text in the response
          response.json().then(function(data) {
            // eslint-disable-next-line no-console
            console.log(data);
          });
        })
        .catch(function(err) {
          // eslint-disable-next-line no-console
          console.log("Fetch Error :-S", err);
        });
    }
  },
  mounted() {
    this.fetchSentiments();
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style-type: none;
}

li {
  margin: 1em 0;
}

.smart-feedback {
  width: 80%;
  max-width: 60rem;
}

.feedback-header {
  text-align: center;
  margin-bottom: 2rem;
}

.search-row {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
