const todosList = {

  data: [
    {
      id: 11341,
      text: 'create todo',
      checked: false,
    },
    {
      id: 32111,
      text: 'relocate sofas',
      checked: false,
    },
    {
      id: 14511,
      text: 'buy hdmi',
      checked: false,
    },
    {
      id: 27111,
      text: 'drink coffee',
      checked: false,
    }
  ],

  root: document.querySelector('#root'),
  rootChecked: document.querySelector('#root-checked'),

  render: function () {
    root.innerHTML = ''
    this.rootChecked.innerHTML = ''
    this.data.forEach(el =>{
      const todo = `
      <li data-id=${el.id}>
        <input class='checkbox' type="checkbox" name="" id="chbox${el.id}" checked >
        ${el.text}
        <button class='todo-move-top'>top</button>
        <button class='todo-del'>del</button>
        <button class='todo-move-down'>down</button>
      </li>`
      if(!el.checked) this.root.innerHTML += todo
      if(el.checked) this.rootChecked.innerHTML += todo
    })

    const chboxAdd = document.querySelectorAll('.checkbox')
    chboxAdd.forEach(el=>{
      //console.log(el.checked)
      let chboxId = el;
      let i = 0;
      this.data.forEach(el =>{
        if(chboxId.id.substr(5) == el.id){
          chboxId.checked = el.checked;
        }
      })
      el.addEventListener('click', () => this.removeCkbox(chboxId))
      
    })
    

    /*
    const sorting = document.querySelectorAll('option')

    sorting.forEach(el =>{
      el.addEventListener('click', () => this.dataSort(sorting))
    })
    
    */
    
    const sorting = document.querySelector('#sorting')
    sorting.addEventListener('change', () => this.dataSort(sorting))
    
    
    const btnsDel = document.querySelectorAll('.todo-del')
    btnsDel.forEach(el=>{
        //const todoType = el.className
      const todoId = el.parentNode.getAttribute('data-id')
      el.addEventListener('click', () => this.remove(todoId) )
    })

    const btnsTop = document.querySelectorAll('.todo-move-top')
    btnsTop.forEach(el=>{
      const todoId = el.parentNode.getAttribute('data-id')
      let copy = el.parentNode.previousElementSibling
      let todoNextId 
      if(copy) todoNextId = copy.getAttribute('data-id')
      el.addEventListener('click', () => this.moveTop(todoId,todoNextId) )
    })

    const btnsDown = document.querySelectorAll('.todo-move-down')
    btnsDown.forEach(el=>{
      const todoId = el.parentNode.getAttribute('data-id')
      let copy = el.parentNode.nextElementSibling
      let todoNextId 
      if(copy) todoNextId = copy.getAttribute('data-id')
      el.addEventListener('click', ()=> this.moveDown(todoId,todoNextId) )
    })
  },

  dataSort: function () {
    console.log("yo")
    

    if(sorting.selectedIndex == 2){
      /*
      this.data.sort(function(a,b){
        if (a.text > b.text) {
          return 1;
        }
        if (a.text < b.text) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
      todosList.render()  
      */
     console.log("hyo")
    }

    
    
    
  },

  removeCkbox: function (event) {
    this.data.forEach(el =>{
      if(event.id.substr(5) == el.id) el.checked = !el.checked
      todosList.render()
    })

  },

  add: function (event) {
    event.preventDefault()
    const input = document.querySelector('.form-input')
    const obj = {
      id: Math.floor(Math.random() * 100000) + 10000,
      text: input.value,
      checked: false,
    }

    todosList.data.unshift(obj)
    todosList.render()
    input.value = ''
  },


  remove: function(id){
    let i = 0
    this.data.forEach(el =>{
        if(el.id == id) this.data.splice(i,1)
        i++
    })
    todosList.render()
  },

  moveTop: function(id, prevId){
    let idIndex
    let idIndexPrev
    let i = 0
    this.data.forEach(el =>{
      if(el.id == prevId) idIndexPrev = i
      if(el.id == id) idIndex = i
      if(el.id == id){
        if(idIndex  && idIndexPrev >= 0 ){
          let copyTodoElem = this.data[idIndex]
          this.data[idIndex] = this.data[idIndexPrev]
          this.data[idIndexPrev] = copyTodoElem
        }
      }
      i++
    })
    todosList.render()
  },

  moveDown: function(id, nextId){
    let idIndex
    let idIndexNext 
    let i = 0
    this.data.forEach(el =>{
      if(el.id == id) idIndex = i
      if(el.id == nextId) idIndexNext = i
        if(idIndex >= 0 && idIndexNext ){
          let copyTodoElem = this.data[idIndex]
          this.data[idIndex] = this.data[idIndexNext]
          this.data[idIndexNext] = copyTodoElem
          idIndex = undefined
          idIndexNext = undefined
        }
        i++
    })
    todosList.render()
  },

  start: function () {
    const btn = document.querySelector('.form-btn')
    btn.addEventListener('click', (event) => this.add(event))


    todosList.render()
  }
}

todosList.start()


const a1 = () => console.log

const a2 = () => (
  console.log()
)

const a3 = () => {

}