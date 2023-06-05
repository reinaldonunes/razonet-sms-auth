<script lang="ts">
  import { useAuthStore } from '~/stores/auth'

  export default defineComponent({
    name: 'PinVerification',
    
    data() {
      return {
        input:{
          first: '',
          second: '',
          third: '',
          fourth: '',
          fifth: '',
          sixth: ''
        },
      }
    },

    methods: {
      nextField(field: string){
        (this.$refs[field] as HTMLInputElement).focus()
      },

      requestValidPin(){
        const auth = useAuthStore();

        const dataSend = {
          auth: {
            pin: this.pin_to_send,
            phone: auth.cellphone
          }
        }

        auth.validatePin()
      }
    },
    
    mounted(){
      (this.$refs['first'] as HTMLInputElement).focus()
    },

    computed:{
      pin_generated(){
        const auth = useAuthStore();
        return auth.pin.code
      },
      pin_to_send(){
        return Number(this.input.first + this.input.second + this.input.third + this.input.fourth + this.input.fifth + this.input.sixth)
      }
    }
  })
</script>
<template>
  <div class="card border-0 shadow p-5 max-size-card">
    <div class="row">
      <div class="col-12 d-flex text-center flex-column mb-4">
        <i class="bi bi-shield-lock-fill display-5 text-info"></i>
        <h3 class="mb-2 text-center text-info">Valide seu número para continuar</h3>
        <span class="alert alert-info">Pin gerado: {{ pin_generated }}</span>
        <span class="alert alert-danger">Pin validação: {{ pin_to_send }}</span>
        <span class="fs-6 text-secondary text-center">Insira o código que enviamos por WHATSAPP para o número *****8910:</span>
      </div>
      <div class="col-2">
        <input type="text" class="form-control text-center text-center" maxlength="1" ref='first' v-model='input.first' autofocus @input="nextField('second')" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control text-center" maxlength="1" ref="second" v-model='input.second' @input="nextField('third')" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control text-center" maxlength="1" ref="third" v-model='input.third' @input="nextField('fourth')" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control text-center" maxlength="1" ref="fourth" v-model='input.fourth' @input="nextField('fifth')" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control text-center" maxlength="1" ref="fifth" v-model='input.fifth' @input="nextField('sixth')" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control text-center" maxlength="1" ref="sixth" v-model='input.sixth' />
      </div>
      <div class="col-12 mt-4">
        <span class="d-block m-auto text-secondary text-center fs-6">Ainda não recebeu o código? Aguarde 00s</span>
      </div>

      <div class="col-12 mt-4">
        <button type="button" @click="requestValidPin" class="btn btn-light w-100 text-secondary">Confirmar código</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.max-size-card {
  margin: 0 auto;
  max-width: 650px;
}
</style>