
var  Api =  'http://localhost:3000/list';

function start() {
   getList(renderList)
   handleCreateForm()
}
start();


function getList(callback){
    fetch(Api)
    .then(function(response){
        return response.json()
    })
    .then(callback)
}


function  renderList(questions){
      let  lists = document.querySelector('#list')
      lists.innerHTML = ` <div class="list">
      <div class="list_question">
      <p>Câu hỏi dễ</p>
      <div class="list_content">
          <p> ${questions.length} Câu hỏi</p>
          <p>Lớp 5</p>
          <p>Toán Học</p>
      </div>
      </div>
      </div>
  `
    let htmls = questions.map((question) =>{
        return `
        <div class="content">
        <p>${question.question}</p>
        <div class="content_btn">
            <button>${question.A}</button>
            <button>${question.B}</button>
            <button>${question.C}</button>
            <button>${question.D}</button>
        </div>
        <p>Câu trả lời đúng là :</p>
        <div class="content_btn">
            <button class = "${question.dapan === "A" ? "active":""}">${question.A}</button>
            <button class = "${question.dapan === "B" ? "active":""}">${question.B}</button>
            <button class = "${question.dapan === "C" ? "active":""}">${question.C}</button>
            <button class = "${question.dapan ==="D" ? "active":""}">${question.D}</button>
        </div>
        <div class="stt">${question.id}</div>
    </div></div>
        `
    })

    document.querySelector('.questions').innerHTML = htmls.join('')

     document.querySelector('.edit_content').innerHTML = `
                <p>${questions.length} Câu hỏi</p>
                <p>Lớp 5</p>
              `

    document.querySelector('.list_question').onclick  = () =>{
    lists.style.display = "none"
    document.querySelector('#content').style.display = "flex"
  }
  document.querySelector('.edit_btn').onclick  = () =>{
    document.querySelector('#content').style.display = "none"
    document.querySelector('#main').style.display = "block"
  }
  document.querySelector('.btn-back').onclick  = () =>{
    lists.style.display = "block"
    document.querySelector('#main').style.display = "none"
    location.reload()    
  }
  


  let a = questions.map((questions1) =>{
    return `
    <div  onclick = clickBtn(${questions1.id})>
      <p>${questions1.id}</p>
      <div class="list-tt">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
      </div>
      </div>
      
      `
  })
  document.querySelector('.list-ds').innerHTML = a.join('')

let b = questions.map((questions2) =>{
    return `
    <div class ="ok ${questions2.id > 1? "display" : ""}" >
    <p>Câu hỏi</p>
    <div class="edit-question">
    <input type="text" id="fname" value="${questions2.question}">
</div>
    <p>Các lựa chọn</p>
    <form class="option">
        <input type="radio"  ${questions2.dapan=== "A" ? "checked":""} name="dapanedit" />
    <input type="text" class="a"  name="A" value="${questions2.A}">
          <input type="radio"  ${questions2.dapan=== "B" ? "checked":""} name="dapanedit"  />
    <input type="text"  class="a" name="B" value="${questions2.B}">
          <input type="radio"  ${questions2.dapan=== "C" ? "checked":""} name="dapanedit"/>
           <input type="text" class="a" name="C" value="${questions2.C}">
        <input type="radio"  ${questions2.dapan=== "D" ? "checked":""} name="dapanedit"  />
          <input type="text" class="a" name="D" value="${questions2.D}">
    </div>
    </form>
    `
})
document.querySelector('.main_app-content').innerHTML = b.join('')
}



let Index = 1;
 showLists(Index);
 function clickBtn(a) {
   showLists(Index=a);
 }


 function showLists() {
   for ( let i = 0; i < document.querySelectorAll(".ok").length; i++) {
    document.querySelectorAll(".ok")[i].style.display = "none";  
    document.querySelectorAll(".ok")[Index-1].style.display = "block";  
   }
 }


document.querySelector('.list-add').onclick = () =>{
    document.querySelector('.create').style.display = 'block'
    document.querySelector(".main_app-content").style.display = "none";  
    document.querySelector(".btn-save").style.display = "none";  
    document.querySelector('.btn-create').style.display = 'block'

   }


   function createQuestion(data,callback){
        var option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
         fetch(Api,option)
            .then(response => response.json())
            .then(callback);
         

        } 
        

       
   function handleCreateForm(){
         let Create = document.querySelector('.btn-create')
        
       
         Create.onclick = ()=>{
             var question = document.querySelector('input[name = "question"]').value
            var  A= document.querySelector('input[name = "a"]').value
             var B = document.querySelector('input[name = "b"]').value
             var C = document.querySelector('input[name = "c"]').value
             var D = document.querySelector('input[name = "d"]').value
             for (var z= 0;z <document.querySelectorAll('input[name ="dapanedit"]').length;z++){
                if (document.querySelectorAll('input[name ="dapanedit"]')[z].checked){
                   var  dad= document.querySelectorAll('input[name ="dapanedit"]')[z].value
                }
            }
             var formData ={
                 question : question,
                 A : A,
                 B:B,
                 C:C,
                 D:D,
                 dapan :  dad
                }
                createQuestion(formData,function(){
                    getList(renderList)
                })
         }
        }
