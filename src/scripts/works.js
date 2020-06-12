import Vue from "vue";
import axios from 'axios'

const request = axios.create({
  baseURL: "https://webdev-api.loftschool.com/",
});



const tags = {
	template: '#works__tags',
	props: {
		tags: Array
	}


}

const arrows = {
	template: '#works__arrows',
	props: {
		dataPags: Array,
		currentslide: Object
	}

}

const pagination = {
	template: '#works__pagination',
	props: {
		dataPags: Array,
		currentslide: Object
	},
	data() {
		return {
			dataUrl: "https://webdev-api.loftschool.com/"

		}
	}


}

const bigImg = {
	template: '#works__image',
	props: {
		currentImg: String
	},
	data() {
		return {
			dataUrl: "https://webdev-api.loftschool.com/"
		}
	}
}

const sideLeft = {
	template: '#works__left',
	props: {
		dataWorks: Array,
		currentImg: String,
		currentslide: {}

	},
	components: {
		bigImg,
		pagination,
		arrows
	}

}
const sideRight = {
	template: '#works__right',
	components: {
		tags
	},
	props: {
		currentInfo: Object
	},


	computed: {

		tagsArray() {
			return this.currentInfo.techs.split(',');
		}



	}
}


new Vue({
	el: '#works-block',
	template: '#works__content',
	components: {
		sideLeft,
		sideRight
	},
	data() {
		return {
			dataWorks: [],
			currentItem: 0,
			currentslide: {}
		}
	},
	//created() {
	//	fetch('https://raw.githubusercontent.com/Anna185/portfolio-advansed/week1/src/data/works.json')
		//	.then(resp => resp.json())
		//	.then(resp => {

		//		this.dataWorks = resp;

		//		this.currentslide = this.dataWorks[this.currentItem]

		//	})

//	},
	computed: {
		watchCurItem() {

			return this.currentslide = this.dataWorks[this.currentItem];

		}


	},
	methods: {

		btnSlide(direction) {
			direction == 'next' ? this.currentItem++ : this.currentItem--
			this.currentItem < 0 ? this.currentItem = 0 : this.currentItem;

			this.currentItem > this.dataWorks.length - 1 ? this.currentItem = this.dataWorks.length - 1 : this.currentItem;



			this.watchCurItem;


			const items = this.$children[0].$children[1].$refs.pagItem;
			
			

			if (direction == 'next' && this.currentItem != this.dataWorks.length - 1) {
				items.appendChild(items.firstElementChild);
			} else if (direction == 'prev' && this.currentItem != 0) {
				items.insertBefore(items.lastElementChild, items.firstElementChild);
			}
		},
		makeInfiniteLoopForIndex(value) {
      const worksAmountFromZero = this.works.length - 1;
    
      if (value > worksAmountFromZero) this.currentItem = worksAmountFromZero;
      if (value < 0) this.currentItem = 0;
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.currentItem++;
          break;
        case "prev":
          this.currentItem--;
          break;
      }
    
    },
    
    makeArrWithUploadedImages(array) {
      return array.map((item) => {

				const linkToPic = `https://webdev-api.loftschool.com/${item.photo}`;
				item.photo = linkToPic;
        return item;
      });
    },
  },
  async created() {
		const { data } = await request.get("/works/333");
		console.log(data)
    this.dataWorks = data;
  },
});





