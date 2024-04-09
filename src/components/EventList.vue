<script>
import SectionContainer from '@/ui/SectionContainer.vue'
import Button from '@/ui/Button.vue'
import axios from 'axios'
import Checkbox from '@/ui/Checkbox.vue'

export default {
  name: 'EventList',
  components: { Checkbox, Button, SectionContainer },
  data() {
    return {
      year: null,
      month: null,
      withEvent: true,
      events: {},
    }
  },
  created() {
    const now = new Date()
    this.year = now.getFullYear() // Инициализация текущего года.
    this.month = now.getMonth() + 1 // Инициализация текущего месяца.
  },
  mounted() {
    this.loadEvents()
  },
  methods: {
    previousMonth() {
      if (this.month === 1) {
        this.year--
        this.month = 12
      } else {
        this.month--
      }
      this.loadEvents()
    },
    nextMonth() {
      if (this.month === 12) {
        this.year++
        this.month = 1
      } else {
        this.month++
      }
      this.loadEvents()
    },
    loadEvents() {
      axios
          .get('/api/events/by_date', {
            params: {
              year: this.year,
              month: this.month,
              withEvent: Number(this.withEvent),
            },
          })
          .then(response => {
            this.events = response.data
          })
    },
    monthName(monthNumber) {
      const date = new Date(null, monthNumber - 1)
      return date.toLocaleString('ru', { month: 'long' })
    },
  },
}
</script>

<template>
  <SectionContainer title="Управления событиями">
    <div class="divider"/>
    <RouterLink to="/events/create">
      <Button>Добавить событие</Button>
    </RouterLink>
    <div class="divider"/>
    <h3 class="header">Список событий на {{ monthName(month) }} {{ year }} по дням</h3>
    <div class="navigation">
      <Button @click="previousMonth">Предыдущий ({{ monthName(month === 1 ? 12 : month - 1) }})</Button>
      <span>Навигация по месяцам</span>
      <Button @click="nextMonth">Следующий ({{ monthName(month === 12 ? 1 : month + 1) }})</Button>
    </div>
    <Checkbox v-model="withEvent" @click="loadEvents">Показывать только дни с событиями</Checkbox>
    <div v-if="withEvent && events.length === 0" class="no-events">
      На {{ monthName(month) }} {{ year }} нет ни одного события
    </div>
    <div v-else class="event-list">
      <div v-for="(event, day) in events" class="event-item">
        <p class="day">{{ day }} {{ monthName(month) }} {{ year }}</p>
        <div v-if="event" class="event-info">
          <p>Название: <span class="event-info-value">{{ event.name }}</span></p>
          <p>Место проведения: <span class="event-info-value">{{ event.location }}</span></p>
          <p>Общее количество мест: <span class="event-info-value">{{ event.limit }}</span></p>
          <p>Количество доступных мест: <span class="event-info-value">{{ event.limit }}</span></p>
        </div>
        <div v-else class="no-event">
          Нет события
        </div>
      </div>
    </div>
  </SectionContainer>
</template>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  gap: 25px;
  margin: 25px 0;
}

.navigation span {
  font-weight: 500;
}

.no-events {
  font-size: 1.2rem;
  font-weight: 700;
  color: darkred;
}

.event-list {
  display: flex;
  flex-direction: column;
}

.header {
  font-size: 1.2rem;
}

.event-item {
  display: flex;
  padding: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px rgba(0, 0, 0, .2);
}

.event-item:not(:first-child) {
  margin-top: 25px;
}

.event-item .day {
  width: 200px;
  margin-right: 60px;
  padding-right: 60px;
  border-right: 1px solid #ccc;
  font-weight: 700;
}

.event-item .event-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.event-item .event-info .event-info-value {
  font-weight: 500;
}

.event-item .no-event {
  font-weight: 500;
  color: darkred;
}
</style>
