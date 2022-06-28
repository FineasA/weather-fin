import { defineStore } from 'pinia'

export const useLocationQueryStore = defineStore('locationQuery', {
  state: () => ({
    location: 'Chicago'
  }),
  actions: {
    setLocation(query) {
      this.location = query
    }
  }
})