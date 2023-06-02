import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticate:{
        isLogged: false,
        message: '',
        token: ''
      },
      pin:{
        code: '',
        sended: false
      },
      cellphone: 0,
      user:{ }
    }
  },

  actions: {
    async requestPin(cellphonenumber:number){
      console.log(cellphonenumber)

      const auth = {
        phone: cellphonenumber
      }

      
      const response = await useFetch('https://9210-177-131-117-82.ngrok-free.app/api/auth/generate_pin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({auth})
      })

      this.cellphone = cellphonenumber

      if(response.data.value != null){
        this.pin.sended = true
        // @ts-ignore
        this.pin.code = response.data.value?.pin
        this.authenticate.message = response.error.value?.data.error
      }else{
        this.pin.sended = false
        this.authenticate.message = response.error.value?.data.error
      }
    },
  },

  getters:{
    //@ts-ignore
  },
})