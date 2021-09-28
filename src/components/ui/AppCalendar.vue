<template>
  <div class="callendar-range">
    <div class="row wrap">
              <div class="form-group">
                  <label>Start date </label>
                  <flat-pickr class="form-control"
                              :config="configs.start"
                              v-model="form.dateStart"
                              @on-change="onStartChange">
                  </flat-pickr>
              </div>
              <div class="form-group">
                  <label>End date </label>
                  <flat-pickr class="form-control"
                              :config="configs.end"
                              v-model="form.dateEnd"
                              @on-change="onEndChange">
                  </flat-pickr>
              </div>
              <q-btn>SHOW RANGE</q-btn>
    </div>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.min.css';
export default {
  components: {
    FlatPickr
  },
  data () {
    return {
      form: {
        dateStart: Date.now().setMonth(Date.now().getMonth() - 1),
        dateEnd: Date.now()
      },
      configs: {
        start: {
          minDate: null,
          maxDate: null
        },
        end: {
          minDate: null
        }
      }
    };
  },
  methods: {
    onStartChange (dateStr) {
      this.configs.end.minDate = dateStr;
    },
    onEndChange (dateStr) {
      this.configs.start.maxDate = dateStr;
    },
    showDiagram () {
      //
    }
  }
};
</script>

<style lang="scss" scoped>
  .callendar-range {
    margin: 0.5rem 1rem;
  }
  .form-group {
    padding-right: 1rem;
  }
</style>
