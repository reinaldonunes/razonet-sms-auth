import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isLogged: false,
      user: null,
      cellphone: 0,
      pinSended: false,
      pinCode: 0,
      token: null,

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
        this.pinSended = true
        // @ts-ignore
        this.pinCode = response.data.value?.pin
        // @ts-ignore
        console.log(response.data.value?.message)
      }else{
        console.log(response.error.value?.data.error)
      }
    },
  },

  getters:{
    //@ts-ignore
  },
})