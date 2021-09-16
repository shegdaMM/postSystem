<template>
 <section class="pagination">
        <a @click="prevPage" title="previous" class="pagination__item" v-if="pagenationCount > 4">
          <i class="fas fa-angle-left"></i>
        </a>
        <a @click="goto(1)"
        class="pagination__item"
        :class="{'pagination__item-active': 1 == this.currentItem}"
        v-if="pagenationCount > 2"
        >
            <span> {{ 1 }} </span>
        </a>
        <span class="pagination__item pagination__item--more"
        v-if="this.currentItem > 3">...</span>
        <template v-for="i in pagenationCount" :key="i">
          <a @click="goto(i)" v-if="(!(i!=1) ^ (i!= pagenationCount)) &&  ((i >= currentItem - 2) && ((i <= currentItem + 2)))"
          class="pagination__item" :class="{'pagination__item-active': i == this.currentItem}">
                <span> {{ i }} </span>
          </a>
        </template>
        <span class="pagination__item pagination__item--more" v-if="this.currentItem < (pagenationCount - 3)">...</span>
        <a @click="goto(pagenationCount)"
        class="pagination__item"
        :class="{'pagination__item-active': pagenationCount == this.currentItem}"
        v-if="pagenationCount > 2">
            <span> {{ pagenationCount }} </span>
        </a>
        <a @click="nextPage" title="next" class="pagination__item" v-if="pagenationCount > 4">
          <i class="fas fa-angle-right"></i>
        </a>
    </section>
</template>

<script>
// @user-update="$emit('user-update')"
export default {
    data () {
        return {
            currentItem: 1
        };
    },
    emits: ['list-update'],
    props: {
        listSize: {
            type: Number,
            defult: 0,
            required: true
        },
        itemOnPage: {
            type: Number,
            defult: 10,
            required: true
        }
    },
    computed: {
        pagenationCount () {
            return Math.ceil(this.listSize / this.itemOnPage);
        }
    },
    methods: {
         goto (current) {
          this.currentItem = current;
          this.$emit('list-update', (current - 1) * this.itemOnPage);
        },
        nextPage () {
          if ((this.currentItem + 1) <= this.pagenationCount) {
            this.goto(this.currentItem);
          }
        },
        prevPage () {
           if ((this.currentItem - 1) > 0) {
            this.goto(this.currentItem - 1);
          }
        }
    },
    mounted () {
        this.goto(1);
    }
};
</script>

<style lang="scss" scoped>
    .pagination {
            display: flex;
            justify-content: center;
            margin: 0.7rem 0.2rem;
            font-size: 1rem;

    }
    .pagination__item {
        padding: 0.5rem 0.5rem;
        background: #fff;
        color: #025a47;
        margin: 0 0.2rem;
        border-radius: 50%;
        font-weight: 700;
        height: 100%;
        text-decoration: none;
        cursor: pointer;
        font-size: 0.9rem;
        font-family: 'Bebas Neue', cursive;
        display: flex;
        justify-content: center;
        align-self: center;
    }
    .pagination__item-active {
         color: #fff;
         background: #025a47;
    }
    .pagination__item--more{
      background: transparent;
      padding: 0.5rem 0.1rem;
      margin: 0 0.1rem;
      cursor: default;
    }
</style>>
