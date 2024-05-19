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
        image: null,
        name: '',
        description: '',
        location: '',
        limit: '',
        start: '',
        withSectors: false,
        sectors: [],
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
    addSector() {
      this.event.sectors.push({
        name: '',
        limit: '',
      })
    },
    deleteSector(sectorPosition) {
      this.event.sectors.splice(sectorPosition, 1)
    },
    createEvent() {
      const formData = new FormData()
      formData.append('file', this.event.image)
      axios
          .post('/api/files/upload', formData)
          .then(response => {
            const fileName = response.data
            return axios
                .post('/api/events/create', {
                  main: this.event.main,
                  image: fileName,
                  category_id: this.event.categoryId,
                  name: this.event.name,
                  description: this.event.description,
                  location: this.event.location,
                  limit: this.event.limit,
                  start: this.event.start,
                  with_sectors: this.event.withSectors,
                  sectors: this.event.sectors,
                })
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

    <div class="divider"/>

    <Checkbox v-model="event.withSectors">Бронирование по секторам</Checkbox>

    <div v-if="event.withSectors">

      <div v-for="(sector, index) in event.sectors" class="sector">
        <Input v-model="sector.name" placeholder="Название сектора" style="margin: 0;"/>
        <Input v-model="sector.limit" placeholder="Количество мест сектора" style="margin: 0;"/>
        <Button button-style="danger" @click="deleteSector(index)">Удалить сектор</Button>
      </div>

      <Button @click="addSector">Добавить сектор</Button>

    </div>

    <div class="divider"/>

    <input type="file" @change="(event) => this.event.image = event.currentTarget.files[0]"/>

    <div class="divider"/>

    <Dropdown
        v-model="event.categoryId"
        label="Категория"
        text="Выбрать категорию"
        :items="categories.map(category => ({
          text: category.name, value: category.id
        }))"
    />

    <div v-if="errors.name" class="error">{{ errors.name[0] }}</div>
    <Input v-model="event.name" label="Название" placeholder="Название события"/>

    <div v-if="errors.description" class="error">{{ errors.description[0] }}</div>
    <TextArea v-model="event.description" label="Описание" placeholder="Описание события"/>

    <div v-if="errors.location" class="error">{{ errors.location[0] }}</div>
    <Input v-model="event.location" label="Место проведения" placeholder="Место проведения события"/>

    <div v-if="errors.limit" class="error">{{ errors.limit[0] }}</div>
    <Input v-model="event.limit" label="Общее количество мест" placeholder="Общее количество мест"/>

    <div v-if="errors.start" class="error">{{ errors.start[0] }}</div>
    <Input v-model="event.start" label="Дата и время проведения"
           placeholder="Дата и время проведения в формате гггг-ММ-дд чч:мм"/>

    <Button @click="createEvent">Добавить событие</Button>
  </SectionContainer>
</template>

<style scoped>
.error {
  font-size: 1rem;
  color: darkred;
  margin-bottom: 5px;
}

.sector {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  margin-bottom: 25px;
}

.sector > * {
  flex-grow: 1;
}
</style>
