import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticate:{
        isLogged: false,
        message: '',
        token: '',
        statusCode: 0
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

      
      const response = await useFetch('http://localhost:3000/api/auth/generate_pin/', {
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
    
    async validatePin(){
      const auth = {
        pin: this.pin.code,
        phone: this.cellphone
      }

      const response = await useFetch('http://localhost:3000/api/auth/login_pin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({auth})
      })

      //@ts-ignore
      console.log(response.data.value.token)

      if(response.data.value != null){
        this.authenticate.isLogged = true
        //@ts-ignore
        this.authenticate.token = response.data.value?.token
        //@ts-ignore
        this.user = response.data.value?.user
        
        localStorage.setItem('razo-auth', this.authenticate.token);
        
        setTimeout(() => {
          window.location.href = "/"
        },1500)

      }else{
        this.authenticate.isLogged = false
        this.authenticate.message = response.error.value?.data.error

        console.log(this.authenticate.message)
      }
    },


    async restoreAuthStore(){
      const token = localStorage.getItem('razo-auth')

      try{
        const response = await fetch('http://localhost:3000/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
          },
        })

        if(response.status === 200){
          const data = await response.json();
          
          this.authenticate.isLogged = true
          this.authenticate.statusCode = response.status
          this.authenticate.token = data.token
          this.user = data.user

          console.log("Login realizado!")
        }else{
          console.error('Erro na requisição:', response.status);
          this.authenticate.statusCode = response.status
        }
      }catch(error){
        console.error('Erro ao fazer a requisição:', error);
        this.authenticate.isLogged = false
        this.authenticate.statusCode = 500
      }
    },


    async isUserLogged(route:string){
      this.restoreAuthStore()

      setTimeout(() => {
        if(this.authenticate.isLogged === true){
          if(route === 'login'){
            window.location.href = '/'
          }
        }else{
          if(route != 'login'){
            window.location.href = '/login'
          }
        }
      },500)
    },

    async logout(){
      const token = localStorage.getItem('razo-auth')

      try{
        const response = await fetch('http://localhost:3000/api/auth/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
          },
        })

        if(response.status === 200){
          this.authenticate.isLogged = false
          this.authenticate.statusCode = response.status
          this.authenticate.token = ''
          this.user = ''

          localStorage.removeItem('razo-auth')
          window.location.href = '/login'

        }else{
          console.error('Erro na requisição:', response.status);
          this.authenticate.statusCode = response.status
        }

      }catch(error){
        console.log('Não foi possível fazer a requisição: ', error)
      }
    }
  },


  getters:{
    //@ts-ignore
  },
})