<template>
  <v-app>
    <navBar />
    <router-view />
    <alert/>
  </v-app>
</template>

<script>
import alert from '@/components/alert'
  //import HelloWorld from '../components/HelloWorld'
  import navBar from '../components/nav/nav'
  import numberFormat from '../helpers/numberformat'
  export default {
    components: {
      navBar, alert
    },
    data(){
      return {
        number1: 32423532532532532,
        number2: 0.425435435354354,
        number3: 1819649167961.651560564849749749
      }
    },
    methods: {
      numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      numberManipulate(x){
        return numberFormat.number_format(x, 3);
      },
      numberManipulate2(x){
        return numberFormat.number_format2(x, 3, 0, '*');
      }
    }
  }
</script>
