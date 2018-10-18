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
            <a href="javascript:void(0)" class="price" @click="sortGoodList">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
              <dl class="filter-price" >
                <dt>Price:</dt>
                <dd>
                  <a href="javascript:void(0)" 
                    :class="{'cur': priceChecked == 4}"
                    @click="setPriceFilter(4)">All</a>
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
                  <li v-for="(item, index) in productList" :key="index">
                    <div class="pic">
                      <a href="#"><img :src="'images/'+ item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">￥{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li> 
                </ul>
                <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" ></infinite-loading>
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
  import InfiniteLoading from 'vue-infinite-loading'
  import qs from 'qs'
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'

  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'

  export default {
    name: 'GoodsList',
    components: {
      InfiniteLoading,
      NavHeader,
      NavFooter,
      NavBread
    },
    data() {
      return {
        productList: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          }
        ],
        priceChecked: 4,
        filterBy: false,
        maskFlag: false,
        sortFlag: false,
        page: 1,
        pageSize: 8
      }
    },
    methods: {
      showFilterPop() {
        this.filterBy = true
        this.maskFlag = true
      },
      setPriceFilter(index) { // 价格过滤
        
        this.priceChecked = index
        this.page = 1
        this.sort = 1
        this.closePop()
        this.getGoodList()
      },  
      closePop() {
        this.filterBy = false
        this.maskFlag = false
      },
      getGoodList($state) {
        var param = {
          sort: this.sortFlag ? 1 : -1,
          page: this.page,
          pageSize: this.pageSize,
          priceLevel: this.priceChecked
        }
        this.productList = []
        this.axios.get(this.baseUrl +'/goods',{
          params: param
        }).then(res => {
          if (res.data.status == 0) {
            this.$nextTick(() => {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');             
            });   
          } else {
            this.productList = []
          }
        })
      },
      sortGoodList() {
        this.sortFlag = !this.sortFlag
        this.page = 1
        this.getGoodList()
      },
      infiniteHandler($state) { // 滚动加载
        console.log('infiniteHandler')
        var param = {
          sort: this.sortFlag ? 1 : -1,
          page: this.page,
          pageSize: this.pageSize,
          priceLevel: this.priceChecked
        }
        setTimeout( ()=> {
          this.page ++
          this.axios.get(this.baseUrl +'/goods',{
            params: param
          }).then(res => {
            if (res.data.status == 0) {
              if ($state) {
                this.productList = this.productList.concat(res.data.result.list)
                $state.loaded()
                if (res.data.result.count == 0) {
                  $state.complete()
                }
              } else {
                this.productList = res.data.result.list
              }      
            } else {
              this.productList = []
            }
          })
        },1000)        
      },
      addCart(id) { // 加入购物车
        this.axios.post(this.baseUrl + '/goods/addCart', qs.stringify({
          productId: id
        })).then(res => {
          if (res.data.status == 0) {
            alert('添加成功')
          } else {
            alert('添加失败')
          }
        })
      }
    },
    mounted() {
    }
  }
</script>


