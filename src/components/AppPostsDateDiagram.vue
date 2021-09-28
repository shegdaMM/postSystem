<template>
  <app-calendar @current-date-range="diagramView"/>
  <div class="check-type-diagram">
    <q-radio v-model="typeView" val="chartjs" label="use chartjs lib" />
    <q-radio v-model="typeView" val="canvas" label="use canvas" />
  </div>

</template>

<script>
import AppCalendar from '@/components/ui/AppCalendar';
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {
        AppCalendar
    },
    data () {
      return {
        range: {
          from: null,
          to: null
        },
        typeView: 'chartjs',
        diagram: {
          label: null,
          value: 0
        },
        allPostData: null
      };
    },
    computed: {
      ...mapGetters(['postsListSize', 'fullPostsList'])
    },
    methods: {
      ...mapActions(['getPostsList', 'clearPostsList']),
      diagramView (range) {
        this.range = range;
      },
      shapeDiagramData () {
        //
      }
    },
    async mounted () {
      await this.getPostsList({ limit: 0 });
      this.$nextTick(function () {
        this.shapeDiagramData();
      });
    },
    beforeUnmount () {
      this.clearPostsList();
    }
};
</script>

<style lang="scss" scoped>

</style>
