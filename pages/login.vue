<script lang="ts">
  import { useAuthStore } from '~/stores/auth'

  import CellPhoneForm from '~/components/CellPhoneForm.vue';
  import PinVerification from '~/components/PinVerification.vue';
  
  export default defineComponent({
    name: 'LoginPage',
    components: {
      CellPhoneForm,
      PinVerification
    },

    data(){
      return{
        currentComponent: 'CellPhoneForm',
        componentKey: 0
      }
    },

    methods: {
      switchComponent(){
        this.componentKey += 1
        if(this.currentComponent === 'CellPhoneForm'){
          this.currentComponent = 'PinVerification'
        }else{
          this.currentComponent = 'CellPhoneForm'
        }
      },
    },
    created() {
      const auth = useAuthStore();
      auth.isUserLogged('login')
    },
  })
</script>
<template>
  <transition name="page" mode="out-in">
    <component :is="currentComponent" key="componentKey" @switchComponent="switchComponent"></component>
  </transition>
</template>
<style scoped>
  /* transitions.css */
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.5s;
  }

  .page-enter,
  .page-leave-to {
    opacity: 0;
  }

</style>