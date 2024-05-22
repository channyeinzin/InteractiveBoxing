
function displayContent(){
    // only display if the user have done the quiz

    for (const key in data){
        let obj = data[key]
        if(!obj['select']){
            $('#box1').removeClass('q_box')
            $('#box2').removeClass('q_box')
            $('#box3').removeClass('q_box')
            $('#box4').removeClass('q_box')
            $('#box5').removeClass('q_box')
            break
        }

        $('#box1').addClass('q_box')
        $('#box2').addClass('q_box')
        $('#box3').addClass('q_box')
        $('#box4').addClass('q_box')
        $('#box5').addClass('q_box')
        displayBasics(obj)
  
    }
}

function displayBasics(obj){

    if(obj['id']=== '1'){
        let question = `<div class="q_title"><span class="m_q">${obj["Question"]}</span></div>`;
        let given = `<div class="q_title" ><span class="m_g">${obj["Given"]}</span></div>`;
        var curr_id = parseInt(obj["id"]);
        if(curr_id===1){
          let my_q1 = `<div class="q_title"><span class="m_g">${obj["Question"]}</span></div>`;
          $("#box1").prepend(my_q1);
        }
        else{
            $('#box1').prepend(question);
            $('#box1').prepend(given);
        }
        let c_arr = ['choice1','choice2', 'choice3', 'choice4', 'choice5']
        let select= obj.select;
        let answer_array = obj['answer'];
        console.log("select :", select)
        let q1 = $('#q1');
        c_arr.forEach(element=>{
            if (select.includes(element)){
                q1.append(`       
                <li class="mt-4 list-group-item">
                <p></p>
                <input type="checkbox"  checked disabled>
                <label>${obj[`${element}`]['value']}  <b>(Selected)</b></label>
                </li>
                <p>
                <span class="${obj[`${element}`]['validity']}">${obj[`${element}`]['validity']}</span>: 
                ${obj[`${element}`]['explanation']}
                </p>`)
            }
            else{ 
                if (answer_array.includes(element)){
                    q1.append(`       
                    <li class="list-group-item">
                    <input type="radio" disabled>
                    <label>${obj[`${element}`]['value']}</label>
                    </li>                
                    <p>
                    <span class="${obj[`${element}`]['validity']}">${obj[`${element}`]['validity']}</span>: 
                    ${obj[`${element}`]['explanation']}
                    </p>`)   
                    }
            }
        })
    }
    else{
        let question = `<div class="q_title"><span class="m_q">${obj["Question"]}</span></div>`;
        let given = `<div class="q_title" ><span class="m_g">${obj["Given"]}</span></div>`;
        var curr_id = parseInt(obj["id"]);
        if(curr_id===1){
          let my_q1 = `<div class="q_title"><span class="m_g">${obj["Question"]}</span></div>`;
          $(`#box${obj['id']}`).prepend(my_q1)

        }
        else{
            $(`#box${obj['id']}`).prepend(question)
            $(`#box${obj['id']}`).prepend(given)
        }

        let c_arr = ['choice1','choice2', 'choice3']
        let select = obj.select;
        let answer_array = obj['answer'];
        console.log("select :", select)
        let curr_q = $(`#q${obj['id']}`);
        c_arr.forEach(element=>{
            if (select.includes(element)){
                curr_q.append(`       
                <li class="mt-4 list-group-item">
                <input type="radio"  checked disabled>
                <label>${obj[`${element}`]['value']}<b>(Selected)</b></label>
                </li>
                <p>
                <span class="${obj[`${element}`]['validity']}">${obj[`${element}`]['validity']}</span>: 
                ${obj[`${element}`]['explanation']}
                </p>`)
            }
            else{ 
                if (answer_array.includes(element)){
                curr_q.append(`       
                <li class="mt-4 list-group-item">
                <input type="radio" disabled>
                <label>${obj[`${element}`]['value']}</label>
                </li>                
                <p>
                <span class="${obj[`${element}`]['validity']}">${obj[`${element}`]['validity']}</span>: 
                ${obj[`${element}`]['explanation']}
                </p>`)   
                }

            }
        })
        
    }

}



$(document).ready(function () {
    $('#landing_page_box').addClass('landing_page_container1')
    let percentage = (score/5) * 100
    $('#score').append(`<p class="score_b">Score: ${Number(percentage.toFixed(1))}%</p>`)
        displayContent();  
  });