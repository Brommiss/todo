<style>
.inText {
  width: 220px;
}
</style>

<template>
  <div id="app">
    <button @click="count++" @mouseenter="seen = true" @mouseleave="seen = false">
      Счётчик: {{ count }}
    </button>
    <button @click="(isDisabled = !isDisabled), (isSeen = !isSeen)">
      {{ isDisabled ? 'Off' : 'On' }}
    </button>
    <button :disabled="isDisabled" @click="increment">Счётчик: {{ count2 }}</button>
    <div v-if="seen">
      {{ isDisabled ? 'YES' : 'NO' }}
    </div>
    <div>
      <input v-model="txt" v-if="isSeen" />
    </div>
    <!-- <div>
      <p>{{ text }}</p>
    </div> -->
    <!-- <div>
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">Разрешено ли добавлять?</label>
    </div> -->
    <div>
      <button class="addButton" :disabled="!txt" @click="addNewOnList">Add</button>
      <button @click="clear">Clear</button>
    </div>
    <div>
      <p>{{ list }}</p>
    </div>
    <div v-for="item in list" :key="item.id" @click="removeItem(item)">{{ item.text }}</div>
  </div>

  <!-- <div :class="classObject">Lolik</div> -->
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { txt } from '@/utils'

interface ITodo {
  id: number
  text: string
}

const count = ref(0)
const count2 = ref(0)
const seen = ref(false)
const isSeen = ref(true)
const isDisabled = ref(false)
function clear() {
  count2.value = 0
  count.value = 0
  txt.value = ''
  list.value.length = 0
}
// const checked = ref(false) //чекбоксовое значение
const list = ref<ITodo[]>([])

let nextlistId = 0

function addNewOnList() {
  list.value.push({
    id: nextlistId++,
    text: txt.value
  })
  txt.value = ''
}

function removeItem(item: ITodo) {
  console.log(item)
  const index = list.value.indexOf(item)
  list.value.splice(index, 1)
}

async function increment() {
  count2.value++
  await nextTick()
}

// const isActive = ref(true)
// const error = ref(null)

// const classObject = computed(() => ({
//   active: isActive.value && !error.value,
//   'text-danger': error.value && error.value.type === 'fatal'
// }))

// const state = reactive({ count: 0 })
// onMounted(() => {
//   console.log(`Стартовое значение счётчика — ${count2.value}.`)
// })

// import { log } from 'console'
// const author = reactive({
//   name: 'John Doe',
//   books: []
// })
// const publishedBooksMessage = computed(() => {
//   return author.books.length > 0 ? 'Да' : 'Нет'
// })
// console.log(author)

// const firstName = ref('John')
// const lastName = ref('Doe')
// const fullName = computed({
//   get() {
//     return firstName.value + ' ' + lastName.value
//   },
//   set(newValue) {
//     ;[firstName.value, lastName.value] = newValue.split(' ')
//   }
// })
// console.log(fullName)
</script>
