<template>
  <DavidUiLayout>


    <div class="relative overflow-x-auto">
      <table class="events-table ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 text-center">
              Date
            </th>
            <th scope="col" class="px-6 py-3 text-right">
              Left
            </th>

            <th scope="col" class="px-6 py-3 text-center">
              Type
            </th>
            <th></th>
            <th scope="col" class="px-6 py-3">
              Title
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events">
            <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ event.solar }}
            </th>
            <td class="text-right">
              {{ event.day_left }}
            </td>
            <td class="text-center">
              <template v-if="event.deathDate">
                <i class="fa-duotone fa-solid fa-universal-access text-lg text-green-300" :title="event.eventName"></i>
              </template>
              <template v-if="event.type === 'race'">
                <i class="fa-duotone fa-solid fa-person-running text-xl text-red-600" :title="event.title"></i>
              </template>
              <template v-if="event.type === 'holiday'">
                <i class="fa-duotone fa-solid fa-badge text-blue-600" :title="event.title"></i>
              </template>
            </td>
            <td class="event-race-long ">
              {{ }}
              <template v-if="event.type === 'race' && event.distance ">
                <svg v-if="event.distance === 10" class="race_10"><use xlink:href="#10km"></use></svg>
                <svg v-if="event.distance === 15" class="race_15"><use xlink:href="#15km"></use></svg>
                <svg v-if="event.distance === 21" class="race_21"><use xlink:href="#21km"></use></svg>
                <svg v-if="event.distance === 42" class="race_42"><use xlink:href="#42km"></use></svg>
              </template>
            </td>
            <td
              :class="['px-6 py-4', { 'text-red-400': event.type === 'race' }, { 'text-green-400': event.deathDate }]">
              {{ event.eventName ?? event.title }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </DavidUiLayout>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import DavidUiLayout from '@/views/layouts/DavidUiLayout.vue';
import moment from "moment";
import { events } from '@/libraries';

export default defineComponent({
  components: {
    DavidUiLayout,
  },
  data() {
    return {
      events: ref<CalendarEvent[]>([])
    }
  },
  setup() { },
  mounted() {
    this.initData()
  },
  computed: {
    only_run() {
      const queryParams = new URLSearchParams(window.location.search)
      const queryType = queryParams.get("type")
      if (!queryType) {
        return false
      }
      return ["run", "race"].indexOf(queryType) >= 0
    }
  },
  methods: {
    initData() {
      const today = moment().toDate();
      let data = events;
      data = data.filter((event: CalendarEvent) => {
        if (!event.solar_date || event.jp) {
          return
        }
        return event.solar_date > today
      })

      if (this.only_run) {
        data = data.filter((event: CalendarEvent) => {
          return event.type === "race"
        })
      }

      data.sort((a: CalendarEvent, b: CalendarEvent) => {
        if (!a.solar_date || !b.solar_date) {
          return 0;
        }
        return a.solar_date.getTime() - b.solar_date.getTime()
      })

      data.forEach((event: CalendarEvent) => {
        event.day_left = moment(event.solar_date).diff(moment(), "day") + 1
        return event;
      })
      this.events = data;
    }
  },
})
</script>