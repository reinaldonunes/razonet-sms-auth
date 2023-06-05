<script lang="ts">
  import { useAuthStore } from '~/stores/auth'
  
  export default defineComponent({
    name: 'IndexPage',
    data(){
      return{
        user: '',
        status: 0
      }
    },

    methods: {
      getUser(){
        const auth = useAuthStore();
        
        //@ts-ignore
        this.status = auth.authenticate.statusCode
        //@ts-ignore
        this.user = auth.user.profile.username
      },

      destroy_session(){
        const auth = useAuthStore();
        auth.logout()
      }
    },

    created(){
      const auth = useAuthStore();
      auth.isUserLogged('')
      setTimeout(() => {
        this.getUser()
      },1000)
    }
  })


</script>
<template>
  <div class="card border-0 p-5 shadow" v-if="status === 200">
    <span class="text-info fs-4">Olá {{ user }}, você está logado.</span>
    <button class="btn btn-outline-danger mt-4" @click="destroy_session" type="button">Sair</button>
  </div>
  <div v-if="status === 0">
    Autenticando....
  </div>
</template>