<script>
import SectionContainer from '@/ui/SectionContainer.vue'
import Checkbox from '@/ui/Checkbox.vue'
import Input from '@/ui/Input.vue'
import TextArea from '@/ui/TextArea.vue'
import Button from '@/ui/Button.vue'
import axios from 'axios'
import Dropdown from '@/ui/Dropdown.vue'

export default {
  name: 'CreateEventPage',
  components: { Dropdown, Button, TextArea, Input, Checkbox, SectionContainer },
  data() {
    return {
      categories: [],
      event: {
        main: false,
        categoryId: null,
        name: '',
        description: '',
        location: '',
        limit: '',
        start: '',
      },
      errors: {},
    }
  },
  mounted() {
    axios
        .get('/api/categories')
        .then(response => {
          this.categories = response.data
        })
  },
  methods: {
    createEvent() {
      axios
          .post('/api/events/create', {
            main: this.event.main,
            category_id: this.event.categoryId,
            name: this.event.name,
            description: this.event.description,
            location: this.event.location,
            limit: this.event.limit,
            start: this.event.start,
          })
          .then(() => {
            this.$router.push('/events')
          })
          .catch(error => {
            this.errors = error.response.data.errors
          })
    },
  },
}
</script>

<template>
  <SectionContainer title="Добавление нового события">
    <div class="divider"/>
    <Checkbox v-model="event.main">Основное событие</Checkbox>
    <Dropdown
        v-model="event.categoryId"
        label="Категория"
        text="Выбрать категорию"
        :items="categories.map(category => ({
          text: category.name, value: category.id
        }))"
    />

    <div v-if="errors.name" class="error">{{ errors.name[0] }}</div>
    <Input v-model="event.name" label="Название"/>

    <div v-if="errors.description" class="error">{{ errors.description[0] }}</div>
    <TextArea v-model="event.description" label="Описание"/>

    <div v-if="errors.location" class="error">{{ errors.location[0] }}</div>
    <Input v-model="event.location" label="Место проведения"/>

    <div v-if="errors.limit" class="error">{{ errors.limit[0] }}</div>
    <Input v-model="event.limit" label="Максимальное количество участников"/>

    <div v-if="errors.start" class="error">{{ errors.start[0] }}</div>
    <Input v-model="event.start" label="Дата и время проведения"/>

    <Button @click="createEvent">Добавить событие</Button>
  </SectionContainer>
</template>

<style scoped>
.error {
  font-size: 1rem;
  color: darkred;
  margin-bottom: 5px;
}
</style>
