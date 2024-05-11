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
    <button :disabled="isDisabled" @click="increment">Счётчик: {{ count3 }}</button>
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
      <p>{{ theList }}</p>
    </div>
    <div v-for="item in theList" :key="item.id" @click="removeItem(item)">{{ item.text }}</div>
  </div>

  <!-- <div :class="classObject">Lolik</div> -->
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { txt } from '@/utils'
import TheWelcome from './components/TheWelcome.vue'

interface ITodo {
  id: number
  text: string
}

const count = ref(0)
const count3 = ref(0)
const seen = ref(false)
const isSeen = ref(true)
const isDisabled = ref(false)
function clear() {
  count3.value = 0
  count.value = 0
  txt.value = ''
  theList.value.length = 0
}
// const checked = ref(false) //чекбоксовое значение
const theList = ref<ITodo[]>([])

let nextlistId = 0

function addNewOnList() {
  theList.value.push({
    id: nextlistId++,
    text: txt.value
  })
  txt.value = ''
  console.log(TheWelcome)
}

function removeItem(item: ITodo) {
  console.log(item)
  const index = theList.value.indexOf(item)
  theList.value.splice(index, 1)
}

caclAbobo()

async function increment() {
  count3.value++
  await nextTick()
}

console.log('key')
const a = 3
const b = 4
const c = a * b

function caclAbobo() {
  return count3.value * 2
}

onMounted(() => {
  console.log('Счётчик запущен')
  console.log(caclAbobo())
})

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
