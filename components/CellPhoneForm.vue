<script lang="ts">
  export default defineComponent({
    name: 'CellPhoneForm',

    methods: {
      switchComponent(payload: any): void{
        this.$emit('switchComponent', payload)
      }
    }
  })
</script>
<template>
  <div class="card border-0 shadow p-5 max-size-card">
    <div class="row">
      <div class="col-12 d-flex text-center flex-column mb-4">
        <i class="bi bi-phone display-5 text-info"></i>
        <h3 class="mb-2 text-center text-info">Seja bem vindo!</h3>
        <span class="fs-6 text-secondary text-center">Insira o seu número de telefone abaixo para prosseguir com o seu login.</span>
      </div>
      <div class="col-3">
        <label class="label-control position-relative">
          <input type="text" value="+55" class="form-control text-secondary" disabled readonly />
          <span class="flag pt-br-flag position-absolute">🇧🇷</span>
        </label>
      </div>
      <div class="col-2">
        <input type="tel" maxlength="2" class="form-control text-secondary" placeholder="(DDD)" />
      </div>
      <div class="col-7">
        <input type="tel" class="form-control text-secondary" maxlength="9" placeholder="9xxxx-xxxx"/>
      </div>
      <div class="col-12 mt-4">
        <button type="button" @click="switchComponent" class="btn btn-primary fw-bold w-100">ENVIAR CÓDIGO DE VERIFICAÇÃO</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .max-size-card{
    margin:0 auto;
    max-width:650px;
  }
  .pt-br-flag{
    right:10px;
    top:7px;
  }
</style>