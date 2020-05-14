import Vue from "vue";

const thumbs = {
  template: "#slider-thumbs",
  props: ["projects", "currentProject"],
};
const btns = {
  template: "#slider-btns",
  props: ["currentProject", "projects"],
};

const display = {
  template: "#slider-display",
  components: { thumbs, btns },
  props: ["currentProject", "projects", "currentIndex"],
  computed: {
    reversedProjects() {
      const projects = [...this.projects];
      return projects.reverse();
    },
  },
};
const tags = {
  template: "#slider-tags",
  props: ["tags"], 
};
const info = {
  template: "#slider-info",
  components: { tags },
  props: ["currentProject"],
  computed: {
    tagsArray() {
      return this.currentProject.skills.split(",");
    },
  },
};

new Vue({
  el: "#works-block",
  template: "#works-content",
  components: { display, info },
  data() {
    return {
      projects: [],
      currentIndex: 0,
    };
  },
  computed: {
    currentProject() {
      return this.projects[this.currentIndex];
    },
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForIndex(value);
    },
  },

  methods: {
    makeInfiniteLoopForIndex(value) {
      const projectsAmountFromZero = this.projects.lehgth - 1;
      if (value > projectsAmountFromZero) this.currentIndex = 0;
      if (value < 0) this.currentIndex = projectsAmountFromZero;
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
      }
    },
    makeArrWithRequireImages(array) {
      return array.map((item) => {
        const requirePic = require(`../images/content/works/${item.photo}`);
        item.photo = requirePic;
        return item;
      });
    },
  },
  created() {
    const data = require("../data/works.json");
    this.projects = this.makeArrWithRequireImages(data);
  },
});