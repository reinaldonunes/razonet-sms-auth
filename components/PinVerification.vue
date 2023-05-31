<script lang="ts">
  export default defineComponent({
    name: 'PinVerification'
  })
</script>
<template>
  <div class="card border-0 shadow p-5 max-size-card">
    <div class="row">
      <div class="col-12 d-flex text-center flex-column mb-4">
        <i class="bi bi-shield-lock-fill display-5 text-info"></i>
        <h3 class="mb-2 text-center text-info">Valide seu número para continuar</h3>
        <span class="fs-6 text-secondary text-center">Insira o código que enviamos por WHATSAPP para o número *****8910:</span>
      </div>
      <div class="col-2">
        <input type="text" class="form-control" maxlength="1" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control" maxlength="1" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control" maxlength="1" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control" maxlength="1" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control" maxlength="1" />
      </div>
      <div class="col-2">
        <input type="text" class="form-control" maxlength="1" />
      </div>
      <div class="col-12 mt-4">
        <span class="d-block m-auto text-secondary text-center fs-6">Ainda não recebeu o código? Aguarde 00s</span>
      </div>

      <div class="col-12 mt-4">
        <button type="button" class="btn btn-light w-100 text-secondary" disabled>Confirmar código</button>
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