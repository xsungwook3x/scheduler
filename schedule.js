let date = new Date();
let todoArray = new Array();
let worknum = 1;
let cnt = 1;
let todoArraylen = 0;
let indexArray = new Array();
let nowdate = 0;
let nowvar = 0;
let nowvarchild = 0;
let keyval = 0; 
let keyvaltemp = 0;
let tempArray = new Array();
let savedone = false;

let viewYear = date.getFullYear();
let viewMonth = date.getMonth();
let viewDate = date.getDate();

function getText( obj ) {
    return obj.textContent ? obj.textContent : obj.innerText;
}


function renderCalender() {
    
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];


  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  let lastnum = prevDates.length + thisDates.length ;

  const dates = prevDates.concat(thisDates, nextDates);
// 
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                       ? 'this'
                      : 'other';
    if (condition == 'this'){
        dates[i] = `<div class="date" id=${condition}${date} onclick="show(${date})"><span class=${condition}><input id=${date}th type="hidden" value="hello">${date}</span><div id=${date}thchild class="mark1"></div></div>`;

    } else { 
        dates[i] = `<div class="date" id=${condition}${date} onclick=null><span class=${condition}><input id=${date}th type="hidden" value="hello">${date}</span><div id=${date}thchild class="mark1"></div></div>`;

    }

     });




  document.querySelector('.dates').innerHTML = dates.join('');

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }

  document.getElementById('todaydate').innerHTML = `${viewYear}년 ${viewMonth + 1}월 ${viewDate}일`;

  for (const i of thisDates){
    console.log(i);
    tempArray = todoArray.filter(test => test.date == `${viewYear}-${viewMonth+1}-${i}`);
    console.log(`${viewYear}-${viewMonth+1}-${i}`);
    if(tempArray.length != 0){
        document.getElementById(`this${i}`).childNodes[1].className = 'mark2';
  }

};

    document.getElementById('schedule').value = "hello";

    document.getElementById(`this${viewDate}`).click();

}

renderCalender();

function show(e){



  document.getElementById('todaydate').innerHTML = `${viewYear}년 ${viewMonth + 1}월 ` + e + '일';

  nowdate = `${e}`;
  nowvar = `${e}th`;
  nowvarchild = `${e}thchild`
  document.getElementById('schedule').value = document.getElementById(nowvar).value;


  worknum = 1;

  show_draw();
}

function save(){


  // 날짜의 value = 입력창 value;
//   console.log(nowvar);
  document.getElementById(nowvar).value = document.getElementById('schedule').value;

    
    console.log(nowdate);
    document.getElementById(`this${nowdate}`).childNodes[1].className = 'mark2';
    console.log(document.getElementById(`this${nowdate}`).childNodes[1].className);



  // 날짜에 표시 생기기
  
  let todo = {key : `${keyval}`, index : indexArray.length, date : `${viewYear}-${viewMonth+1}-${nowdate}`, work : document.getElementById('schedule').value};

  
  todoArray.push(todo);

  indexArray.push(indexArray.length);

  todoArraylen = todoArraylen + 1;

  save_draw();
  keyval = keyval + 1;

    document.getElementById('schedule').value = "hello";


}

function save_draw(){
    var temp = document.createElement('li');
    temp.setAttribute("class", "list-group-item");
    temp.setAttribute("id", "li"+cnt);
    
    temp.innerHTML = document.getElementById('schedule').value;
    temp.innerHTML += "<input type='checkbox' style='float: right' id='check'/>";
    temp.innerHTML += "<button style='float: right;' class='btn btn-outline-secondary' type='button' onclick='remove(this)' value="+keyval+">Delete</button>";
    document.getElementById('todo_all').appendChild(temp);
    cnt++;
}




function show_draw(){




    document.getElementById('todo_all').innerHTML = "";

    cnt = 0;



    tempArray = todoArray.filter(test => test.date == `${viewYear}-${viewMonth+1}-${nowdate}`);
    console.log("tempArray", tempArray);
    for (let i = 0;i <tempArray.length; i++){
            workval = tempArray[i].work;

            keyvaltemp = tempArray[i].key; 

            var temp = document.createElement('li');
            temp.setAttribute("class", "list-group-item");
            temp.setAttribute("id", "li"+cnt);
            temp.innerHTML = workval;
            temp.innerHTML += "<input type='checkbox' style='float: right' id='check'/>";
            temp.innerHTML += "<button style='float: right;' id="+cnt+" class='btn btn-outline-secondary' type='button' onclick='remove(this)' value="+keyvaltemp+">삭제</button>";
            document.getElementById('todo_all').appendChild(temp);
            cnt++;
    }
    
}





function remove(event){//clicked_id
// 입력창 value = NONE;
    let parent = event.parentNode.parentNode;    
    let child = event.parentNode;
    parent.removeChild(child);
 

    let index1 = todoArray.findIndex(obj => obj.key == event.parentNode.childNodes[1].value);
    console.log(event.parentNode.childNodes[1].value);
    console.log(index1);
    todoArray.splice(index1, 1);


    


    

    tempArray = todoArray.filter(test => test.date == `${viewYear}-${viewMonth+1}-${nowdate}`);
    console.log(tempArray);
    if(tempArray.length == 0){
        document.getElementById(nowvarchild).className = 'mark1';
    }

}

function prevMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);

    viewYear = date.getFullYear();
    viewMonth = date.getMonth();
    viewDate = date.getDate();

    document.getElementById('todo_all').innerHTML = "";

    renderCalender();
  }
  
function nextMonth() {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);

    viewYear = date.getFullYear();
    viewMonth = date.getMonth();
    viewDate = date.getDate();

    document.getElementById('todo_all').innerHTML = "";

    renderCalender();
  }
  

function goToday() {
  date = new Date();

  viewYear = date.getFullYear();
  viewMonth = date.getMonth();
  viewDate = date.getDate();

  document.getElementById('todo_all').innerHTML = "";

  renderCalender();
};

