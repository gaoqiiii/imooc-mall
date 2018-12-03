<template>
  <div> 
    <NavHeader></NavHeader>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>check out</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>Confirm</span> address</li>
          <li class="cur"><span>View your</span> order</li>
          <li class="cur"><span>Make</span> payment</li>
          <li class="cur"><span>Order</span> confirmation</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="images/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>Congratulations! <br>Your order is under processing!</h3>
          <p>
            <span>Order ID：{{orderId}}</span>
            <span>Order total：$ {{orderTotal}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">  
              <router-link class="btn btn--m" to="/">Goods List</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavFooter></NavFooter>
  </div>
</template>
<script>
  import '../assets/css/base.css'
  import '../assets/css/checkout.css'
  
  import NavHeader from '../components/NavHeader.vue'
  import NavFooter from '../components/NavFooter.vue'
  import NavBread from '../components/NavBread.vue'
  import Modal from '../components/Modal.vue'

  import  qs from 'qs'
  export default {
    name: 'orderSuccess',
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    data() {
      return {
        orderId: '',
        orderTotal: ''
      }
    },
    mounted() {
      let orderId = this.$route.query.orderId
      if (!orderId) {
        return  
      }
      this.axios.post(this.baseUrl + '/users/orderDetail', qs.stringify({
        userId: 100000077,
        orderId: orderId
      })).then(response => {
        let res  = response.data
        if (res.status == '0') {
          this.orderId = orderId
          this.orderTotal = res.result.orderTotal
        }
      })
    },
  }
</script>
