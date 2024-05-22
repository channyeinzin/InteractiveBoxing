

let totalScore= 0;
function appendOptions(curr_id){
    let choices;
    if (curr_id !== 1) {
        choices = `
        <ul class="list-unstyled my_list list-group list-group-flush" id="mySelect">
        <li class="list-group-item" id="c1">
            <input type="radio" id="choice1" name="choice" value="choice1">
            <label for="choice1">${data["choice1"].value}</label>
        </li>
        <li class="list-group-item" id="c2">
            <input type="radio" id="choice2" name="choice" value="choice2">
            <label for="choice2">${data["choice2"].value}</label>
        </li>
        <li class="list-group-item" id="c3">
            <input type="radio" id="choice3" name="choice" value="choice3">
            <label for="choice3">${data["choice3"].value}</label>
        </li>
    </ul>`;
      } else {
        choices = `
        <ul class="list-unstyled my_list list-group list-group-flush"  id="mySelect">
        <li id="c1" class="list-group-item">
            <input type="checkbox" id="choice1" name="choice" value="choice1">
            <label for="choice1">${data["choice1"].value}</label>
        </li>
        <li id="c2" class="list-group-item">
            <input type="checkbox" id="choice2" name="choice" value="choice2">
            <label for="choice2">${data["choice2"].value}</label>
        </li>
        <li id="c3" class="list-group-item">
            <input type="checkbox" id="choice3" name="choice" value="choice3">
            <label for="choice3">${data["choice3"].value}</label>
        </li>
        <li id="c4" class="list-group-item">
        <input type="checkbox" id="choice4" name="choice" value="choice4">
        <label for="choice4">${data["choice4"].value}</label>
        </li>
        <li id="c5" class="list-group-item">
        <input type="checkbox" id="choice5" name="choice" value="choice5">
        <label for="choice5">${data["choice5"].value}</label>
        </li>
    </ul>`;
      }
      $("#choices_").append(choices);
}

function appendChoices(curr_id){
    let choice1 = data["choice1"];
    let choice2 = data["choice2"];
    let choice3 = data["choice3"];
    $("#c1").append(`<p> <span class="${choice1.validity}">${choice1.validity}</span>: ${choice1.explanation}</p>`);
    $("#c2").append(`<p> <span class="${choice2.validity}">${choice2.validity}</span>: ${choice2.explanation}</p>`);
    $("#c3").append(`<p> <span class="${choice3.validity}">${choice3.validity}</span>: ${choice3.explanation}</p>`);
    if (curr_id ===1){
        let choice4 = data["choice4"];
        let choice5 = data["choice5"];
        $("#c4").append(`<p> <span class="${choice4.validity}">${choice4.validity}</span>: ${choice4.explanation}</p>`);
        $("#c5").append(`<p> <span class="${choice5.validity}">${choice5.validity}</span>: ${choice5.explanation}</p>`);
    }
 }



function displayContent() {
  let btn_element = `<div class="col-12  d-flex justify-content-end align-items-end check_btn">
  <button class="btn btn-outline-secondary " id="check">Check</button></div>`;
  let question = `<div class="q_title"><span class="m_q">${data["Question"]}</span></div>`;
  let given = `<div class="q_title" ><span class="m_g">${data["Given"]}</span></div>`;
  var curr_id = parseInt(data["id"]);
  if(curr_id===1){
    let my_q1 = `<div class="q_title"><span class="m_g">${data["Question"]}</span></div>`;
    $("#header_info").prepend(my_q1);
  }
  else{
    $("#header_info").prepend(question);
    $("#header_info").prepend(given);
  }
  appendOptions(curr_id);
  var length_ = Object.keys(quiz).length;

  $("#header_info").prepend(`<p>${curr_id} of ${length_}</p>`);
  $("#quiz_content").append(btn_element);
}

function handleScore(selectedOptions){
    let score = 0;
    if (data['id'] === '1'){
      let counter = 0;
      for (var i = 0; i < selectedOptions.length; i++){
        if(!data['answer'].includes(selectedOptions[i])){
           score=0
           break
        }
       counter++
      }
      selectedOptions.forEach(element=>{
        var newElement = $("<div><b>Selected!</b></div>");
        newElement.insertBefore($(`#${element}`))
      })     
      score = counter/3   
    }
    else{
     for (var i = 0; i < selectedOptions.length; i++){
        if(!data['answer'].includes(selectedOptions[i])){
           score=0
           break
        }
        score=1;
      }
      selectedOptions.forEach(element=>{
        var newElement = $("<div><b>Selected!</b></div>");
        newElement.insertBefore($(`#${element}`))
      })     
    }

      totalScore += score
      console.log("score = ",totalScore)
}

function buttonState(){
  $('#check').prop("disabled", true);
  $('#mySelect').on('change', function(){
    var selectedOptions = $("input[name='choice']:checked").map(function() {
      return $(this).val();
  }).get();
    console.log("val ", selectedOptions) 
   if (selectedOptions.length === 0){
     console.log("select len ", selectedOptions.length)
     $('#check').prop("disabled", true);
  }
  else{
    $('#check').prop("disabled", false);
  }
  })


}



function ifCheck() {
  $("#check").click(function () {
    var length_ = Object.keys(quiz).length;
    var curr_id = parseInt(data["id"]);
    var selectedOptions = $("input[name='choice']:checked").map(function() {
        return $(this).val();
    }).get();
    if (curr_id === length_) {
      let to_sum = `<div class="col-12  d-flex justify-content-end align-items-end">
      <a class="btn btn-outline-secondary btn_gs" href="/summary">Summary</a> </div>`;
      $("#quiz_content").append(to_sum);
      handleScore(selectedOptions);
      appendChoices(curr_id);
 
    } else if (curr_id === 1) {
      let next_id = curr_id + 1;
      let next_element = `<div class="col-12  d-flex justify-content-end align-items-end">
      <a class="btn btn-outline-secondary btn_gs" href="/quiz/${next_id}">Next Question</a></div>`;
      handleScore(selectedOptions);
   
      $("#quiz_content").append(next_element);
      appendChoices(curr_id);

    } else {
      let next_id = curr_id + 1;
      let next_element = `<div class="col-12  d-flex justify-content-end align-items-end ">
      <a class="btn btn-outline-secondary btn_gs" href="/quiz/${next_id}">Next Question</a> </div>`;
      $("#quiz_content").append(next_element);
      handleScore(selectedOptions);
      appendChoices(curr_id);
    }
    let score_item = {"total": totalScore}
    $.ajax({
        type: "POST",
        url: "/update_quiz",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(score_item),
    });

    let select_item ={ "id": curr_id,
    'selected':selectedOptions}
    $.ajax({
        type: "POST",
        url: "/select",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(select_item),
    });

    console.log("s_item ", select_item)
    $("#check").remove();
    
  });
}

$(document).ready(function () {
  $('#landing_page_box').addClass('landing_page_container')
  displayContent();
  buttonState();
  ifCheck();
});
