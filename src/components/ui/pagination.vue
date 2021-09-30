<template>
 <section class="pagination" v-if="pagenationCount && (pagenationCount > 1)">
        <a @click="prevPage" title="previous" class="pagination__item" v-if="showArrowLeft">
          <span class="fas fa-angle-left"></span>
        </a>
        <a @click="goto(1)"
        class="pagination__item"
        :class="{'pagination__item-active': this.currentItem == 1}"
        v-if="pagenationCount > 2"
        >
            <span> 1 </span>
        </a>
        <span class="pagination__item pagination__item--more"
        v-if="this.currentItem > 3">...</span>
        <template v-for="i in  paginationCounts" :key="i">
          <a @click="goto(i)"
          class="pagination__item" :class="{'pagination__item-active': i == this.currentItem}">
                <span> {{ i }} </span>
          </a>
        </template>
        <span class="pagination__item pagination__item--more" v-if="this.currentItem < (pagenationCount - 3)">...</span>
        <a @click="goto(pagenationCount)"
        class="pagination__item"
        :class="{'pagination__item-active': this.currentItem == pagenationCount}"
        v-if="pagenationCount > 2">
            <span> {{ pagenationCount }} </span>
        </a>
        <a @click="nextPage" title="next" class="pagination__item" v-if="showArrowRight">
          <span class="fas fa-angle-right"></span>
        </a>
    </section>
</template>

<script>
export default {
    data () {
        return {
            currentItem: +(this.propCurrentItem)
        };
    },
    emits: ['list-update'],
    props: {
        listSize: {
            type: Number,
            default: 0,
            required: true
        },
        itemOnPage: {
            type: Number,
            default: 10,
            required: true
        },
        seeOnPage: {
            type: Number,
            default: 2
        },
        propCurrentItem: {
            type: Number,
            default: 1
        }
    },
    computed: {
        pagenationCount () {
            return Math.ceil(this.listSize / this.itemOnPage);
        },
        paginationCounts () {
            const showCount = +(this.seeOnPage);
            const result = [];
            for (let i = +this.currentItem - showCount; i <= +this.currentItem + showCount; i++) {
                if (i > 1 && i < this.pagenationCount) {
                    result.push(i);
                }
            }
            return result;
        },
        showArrowLeft () {
            const result = this.pagenationCount > 4 && this.currentItem !== 1;
            return result;
        },
        showArrowRight () {
            const result = this.pagenationCount > 4 && this.currentItem !== this.pagenationCount;
            return result;
        }
    },
    methods: {
        goto (current) {
          this.currentItem = current;
          this.$emit('list-update', { page: current });
        },
        nextPage () {
            this.goto(this.currentItem + 1);
        },
        prevPage () {
            this.goto(this.currentItem - 1);
        }
    },
    mounted () {
        if (this.propCurrentItem) {
            this.goto(this.propCurrentItem);
        }
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
        width: 1.5rem;
        height: 1.5rem;
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
        height: 100%;

        span {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0;

            margin-bottom: -0.15rem;
        }
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
