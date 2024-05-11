<style>
</style>

<template>
  <div id="app">
    <button @click="count++"
            @mouseenter="seen = true"
            @mouseleave="seen = false" v-text="'Счётчик: ' + count"  />
    <button @click="isDisIsSee()" v-text="isDisabled ? 'Off' : 'On'" />
    <button :disabled="isDisabled" @click="increment" v-text="'Счётчик: ' + count3" />
    <div v-if="seen" v-text="isDisabled ? 'YES' : 'NO'" />
    <div>
      <input v-if="isSeen" v-model="txt">
    </div>
    <!-- <div>
      <p>{{ text }}</p>
    </div> -->
    <!-- <div>
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">Разрешено ли добавлять?</label>
    </div> -->
    <div>
      <button class="addButton"
              :disabled="!txt"
              @click="addNewOnList"v-text="'
        Add
      '" />
      <button @click="clear" v-text="'Clear'" />
    </div>
    <div>
      <p v-text="theList" />
    </div>
    <div v-for="item in theList"
         :key="item.id"
         @click="removeItem(item)"v-text="item.text" />
  </div>
  <div>
    <input v-model="a">
    <input v-model="b">
    <span v-text="c" />
  </div>
  <div v-if="data">
    <p v-for="item in data" v-text="item.title" :key="item.id" />
  </div>
  <div v-else v-text="'Loading'" />
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { txt } from '@/utils'
import TheWelcome from './components/TheWelcome.vue'


interface ITodo {
  id: number
  text: string
}

const count = ref(0)
const count3 = ref(0)
const seen = ref(false)
let isSeen = ref(true)
let isDisabled = ref(false)
function clear() {
  count3.value = 0
  count.value = 0
  txt.value = ''
  theList.value.length = 0
}
// const checked = ref(false) //чекбоксовое значение
const theList = ref<ITodo[]>([])

let nextListId = 0

function addNewOnList() {
  theList.value.push({
    id: nextListId++,
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

calcAbobo()

async function increment() {
  count3.value++
  await nextTick()
}

console.log('key')
const a = ref('')
const b = ref('')
const c = computed(() => +a.value * +b.value)



function calcAbobo() {
  return count3.value * 2
}

onMounted(() => {
  console.log('Счётчик запущен')
  console.log(calcAbobo())
  fetchToDo()
})

interface RemoteToDo{
  id: number
  title: string
}

const data = ref<RemoteToDo[] | null>(null)

async function fetchToDo(){
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  data.value = await res.json()
}

localStorage.setItem('gay','sex')

function isDisIsSee(){
  isDisabled.value = !isDisabled.value
  isSeen.value = !isSeen.value
}
//
// let promice = new Promise(function (resolve, reject) {
//   if (c > 10) { setTimeout(() => resolve('done'), 1000)}
//   setTimeout(() => reject('Error'), 1000)
// })
// console.log(promice)
//
// promice.then(
//   result => console.log(result),
//   error => console.log(error)
// )
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

<style>
.inText {
  width: 220px;
}
</style>
