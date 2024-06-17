<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <section v-else>
      <div class="watch-movie w-screen pr-4 h-screen">
        <iframe
          :src="`https://player.smashy.stream/tv/${tvshowId}?s=${season}&e=${episode}`"
          frameborder="0"
          scrolling="no"
          allowfullscreen
        ></iframe>
      </div>
      <div class="season mt-5 p-10">
        <select class="mb-5 bg-white" v-model="selected" @change="fetchEpisodes">
          <option disabled value="">Choose season</option>
          <option
            v-for="(item, index) in detail.number_of_seasons"
            :key="index"
            :value="index + 1"
          >
            Season {{ index + 1 }}
          </option>
        </select>
        <div v-if="!!listEpisodes" class="list-ep">
          <swiper
            :modules="modules"
            :slides-per-view="6"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            :breakpoints="swiperOptions.breakpointsEp"
            class="mySwiper-slide swiper-ep"
          >
            <swiper-slide v-for="ep in listEpisodes" :key="ep.id">
              <television-episodes
                :series-id="getSeriesId"
                :id="ep.id"
                :image="ep.still_path"
                :num="ep.episode_number"
                :name="ep.name"
                :overview="ep.overview"
                :season="selected"
              ></television-episodes>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
  </main-content>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { movies } from "@/state/helpers";
import TelevisionEpisodes from '../tv-information/episodes/TelevisionEpisodes.vue';
export default {
  data() {
    return {
      detail: [],
      loading: false,
      listEpisodes: null,
      selected: "",
      swiperOptions: {
        breakpointsEp: {
          500: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          800: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          1000: {
            slidesPerView: 4,
            slidesPerGroup: 3,
          },
          1300: {
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
          1600: {
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    TelevisionEpisodes
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  computed: {
    ...movies.moviesComputed,
    season() {
      return this.$route.query.season;
    },
    episode() {
      return this.$route.query.ep;
    },
    tvshowId() {
      return this.$route.params.tvId;
    },
    getSeriesId() {
      return this.$route.params.tvId
    },
  },
  methods: {
    ...movies.moviesMethods,
    async fetchEpisodes() {
      await this.getEpisodes({
        id: this.$route.params.tvId,
        ss: this.selected
      })
      this.listEpisodes = this.episodes
    },
    async initial() {
      this.loading = true;
      await this.getTvShowById(this.$route.params.tvId);
      this.detail = this.filmDetail;
      this.loading = false;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>

<style scoped>
.watch-movie {
  max-height: 90vh;
}
iframe {
  width: 100%;
  height: 100%;
}

select {
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
}
</style>
