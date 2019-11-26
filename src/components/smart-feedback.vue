<template>
  <div class="smart-feedback">
    <h2 class="feedback-header">Smart Feedback</h2>
    <transition-group
      tag="ul"
      name="stagger"
      :style="{ '--total': reviews.length }"
      class="feedback-list"
    >
      <li
        v-for="(review, i) in reviews"
        :key="`review-${i}`"
        :style="{ '--i': i }"
      >
        <p class="tiny">{{ review.phrase }}</p>
        <p class="small">{{ review.sourceText }}</p>
      </li>
    </transition-group>

    <pn-tablist
      :value="activeSentiment"
      center
      @change="activeSentiment = $event.target.value"
    >
      <pn-tab
        v-for="(sentiment, i) in sentiments"
        :key="i"
        :label="sentiment"
        :value="sentiment"
      >
      </pn-tab>
    </pn-tablist>
  </div>
</template>

<script>
export default {
  data: () => ({
    reviews: [],
    date: "2018",
    sentiments: ["POSITIVE", "MIXED", "NEUTRAL", "NEGATIVE"],
    activeSentiment: "MIXED"
  }),
  watch: {
    activeSentiment() {
      this.reviews = [];
      setTimeout(() => {
        this.fetchSentiments();
      }, 500);
    }
  },
  methods: {
    async fetchSentiments() {
      const res = await fetch(
        "https://rknjrmkbz9.execute-api.eu-west-1.amazonaws.com/dev/get/feedback",
        {
          method: "POST",
          body: JSON.stringify({
            since: this.date,
            sentiment: this.activeSentiment
          })
        }
      );

      const { Items } = await res.json();
      this.reviews = Items;
    }
  },
  mounted() {
    this.fetchSentiments();
  }
};
</script>

<style lang="scss" scoped>
.smart-feedback {
  width: 80%;
  max-width: 50rem;
  background-color: white;
  padding: 2.5em 2.5em 0;
  height: 90vh;
  overflow: hidden;
  border-radius: 3rem;
  box-shadow: 0 0.2rem 1.6rem rgba(0, 0, 0, 0.2);
  position: relative;
}

.feedback-header {
  font-size: 1.6em;
  margin: 0 0 1em;
}

ul {
  list-style-type: none;
  padding: 1rem;
}

ul.feedback-list {
  overflow-y: scroll;
  height: 100%;
  padding-bottom: 20rem;

  li {
    margin: 1em 0 3em;
    padding: 2.5em 1.5em 1.5em;
    border-radius: 3rem;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
    position: relative;

    p.tiny {
      color: $postnord-dark;
      position: absolute;
      top: 1.2em;
      right: 3em;
    }
  }
}

pn-tablist {
  box-shadow: 0.2rem 0 0.3rem rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  padding: 1em 0;
  width: 100%;
}

//===========================TRANSITIONS=============================//

.stagger {
  &-move {
    transition: opacity 0.5s linear, transform 0.5s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.4s linear,
      transform 0.4s cubic-bezier(0.64, 0.01, 0.67, 0.92);
    transition-delay: calc(0.1s * (var(--total) - var(--i)));
  }

  &-enter-active {
    transition: opacity 0.4s linear,
      transform 0.4s cubic-bezier(0.29, 0.15, 0.24, 0.97);
    transition-delay: calc(0.1s * var(--i));
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    transform: translateY(2rem);
  }
  &-leave-to {
    transform: translateY(-2rem);
  }
}
</style>
