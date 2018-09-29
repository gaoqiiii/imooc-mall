<template>
  <div>
    <nav-header></nav-header>
    <div>
      <nav-bread>
        <span slot="bread">Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
              <dl class="filter-price" >
                <dt>Price:</dt>
                <dd>
                  <a href="javascript:void(0)" 
                    :class="{'cur': priceChecked == 'All'}"
                    @click="priceChecked = 'All'; maskFlag = false; filterBy = false">All</a>
                </dd>
                <dd v-for="(item, index) in priceFilter" 
                    :key="index"
                    @click="setPriceFilter(index)">
                  <a href="javascript:void(0)" :class="{'cur': priceChecked == index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="./../../static/1.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">999</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="./../../static/2.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">1000</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="./../../static/3.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">500</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="./../../static/4.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">XX</div>
                      <div class="price">2499</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="md-overlay" v-show="maskFlag" @click="closePop"></div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'

  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'

  export default {
    name: 'GoodsList',
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    data() {
      return {
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '2000.00'
          }
        ],
        priceChecked: 'All',
        filterBy: false,
        maskFlag: false
      }
    },
    methods: {
      showFilterPop() {
        this.filterBy = true
        this.maskFlag = true
      },
      setPriceFilter(index) {
        this.priceChecked = index
        this.closePop()
      },  
      closePop() {
        this.filterBy = false
        this.maskFlag = false
      }
    },
    mounted() {
      console.log(this.axios)
    },
  }
</script>


