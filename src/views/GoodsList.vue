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
            <a href="javascript:void(0)" class="price" @click="sortGoodList">Price
              <img src="./../assets/icon-arrow-short.svg" :class="['icon' ,'icon-arrow-short',{'sort-up': sortFlag}]" alt="">
            </a>
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
            <Modal :mdShow='mdShow' v-on:closeModal="mdShow=false">
              <p slot="message">
                请先登陆，否则无法加入到购物车中
              </p>
              <div slot="btnGroup">
                <a href="javascript:;" class="btn btn--m" @click="mdShow=false">关闭</a>
              </div>
            </Modal>
            <Modal :mdShow="addCartShow" v-on:closeModal="addCartShow=false">
              <p slot="message">
                <img src="../assets/icon-status-ok.svg" class="icon" alt="">
              </p>
              <p slot="message">
                添加成功
              </p>
              <div slot="btnGroup">
                <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
                <a href="javascript:;" class="btn btn--m" @click="addCartShow=false">继续购物</a>
              </div>
            </Modal>
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
  import Modal from '@/components/Modal.vue'
  export default {
    name: 'GoodsList',
    components: {
      InfiniteLoading,
      NavHeader,
      NavFooter,
      NavBread,
      Modal
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
        pageSize: 8,
        mdShow: false,
        addCartShow: false
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
            this.addCartShow = true
          } else {
            this.mdShow = false
          }
        })
      }
    },
    mounted() {
    }
  }
</script>
<style>
  .icon-arrow-short {
    transition: all .3s ease-out;
  }
  .sort-up {
    transform: rotate(180deg);
    transition: all .3s ease-out;
  }
  .btn:hover {
    background-color: #ffe5e6;
    transition: all .3s ease-out;
  }
</style>


