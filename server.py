from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect, url_for
app = Flask(__name__)

stances = {
    'orthodox': {
        'name': 'Orthodox',
        'description': [
            'Turn right feet 30 degree to the right vipot the heal, slight raise in right foot',
            'Step forward with left foot',
            'Slight bent in both knees',
            'Even distribution of weight on both legs',
            'Chin, elbow are tucked, guard is up',
        ],
        'image_url': '/static/images/orthodox.gif',
        'common_steps': {
            'steps_forward_backward': {
                'description': [
                    'First: Stand with boxing stance',
                    'Forward Step: Use rare foot to push you forward.',
                    'Backward Step: Use lead foot to push you backward.'
                ],
                'purpose': "The defensive purpose of forward and backward boxing steps is to maintain optimal distance from the opponent, evading incoming strikes while creating opportunities for counterattacks.",
                'image_url': '/static/images/forward_backward.gif'
            },
            'steps_left_right': {
                'description': [
                    'First: Stand with boxing stance',
                    'Left Step: Use lead foot to push you left.',
                    'Right Step: Use rare foot to push you right.'
                ],
                'purpose': "The defensive purpose of left and right boxing steps is to angle off and create angles of attack or defense, enabling evasion of opponent's strikes while setting up advantageous positions for counterattacks.",
                'image_url': '/static/images/left_right.gif'
            },
            'slipping': {
                'description': [
                    'Prerequisite: Boxing stance',
                    'Slip to the RIGHT: Knees bent, shift slightly to the right.',
                    'Slip to the LEFT: Knees bent, shift slightly to the left.'
                ],
                'purpose': "The defensive technique of slipping involves skillfully moving the head offline from specific punches, such as jabs and crosses allowing the boxer to evade the attack while staying in position to counter effectively.",
                'image_url': '/static/images/slippling.gif'
            },
            'rolling': {
                'description': [
                    'Prerequisite: Boxing stance',
                    'Roll to the RIGHT: Knees bent, roll shoulders and move head to the right.',
                    'Roll to the LEFT: Knees bent, roll shoulders and move head to the left.'
                ],
                'purpose': "The defensive technique of rolling involves smoothly rotating the body away from an opponent's punches, particularly effective against hooks and looping shots, enabling the boxer to deflect the force of the blow and maintain positioning for counterattacks.",

                'image_url': '/static/images/rolling.gif'
            },
            'parrying': {
                'description': [
                    'Prerequisite: Boxing stance',
                    'Parry RIGHT: Use your right hand to deflect incoming punches.',
                    'Parry LEFT: Use your left hand to deflect incoming punches.'
                ],
                'purpose': "The defensive technique of parrying entails deflecting specific types of punches, such as jabs and crosses with precise hand movements, redirecting their force away from oneself, thereby minimizing the impact and creating openings for counterattacks.",
                'image_url': '/static/images/parrying.gif'
            }
        }
    },

    'southpaw': {
        'name': 'Southpaw',
        'description': [
            'Turn left feet 30 degree to the left vipot the heal, slight raise in left foot',
            'Step forward with right foot',
            'Slight bent in both knees',
            'Even distribution of weight on both legs',
            'Chin, elbow are tucked, guard is up'
        ],
        'image_url': '/static/images/southpaw.gif',
        'common_steps': {
            'steps_forward_backward': {
                'description': [
                    'First: Stand with boxing stance',
                    'Forward Step: Use rare foot to push you forward.',
                    'Backward Step: Use lead foot to push you backward.'
                ],
                'purpose': "The defensive purpose of forward and backward boxing steps is to maintain optimal distance from the opponent, evading incoming strikes while creating opportunities for counterattacks.",
                'image_url': '/static/images/forward_backward.gif'
            },
            'steps_left_right': {
                'description': [
                    'First: Stand with boxing stance',
                    'Left Step: Use lead foot to push you left.',
                    'Right Step: Use rare foot to push you right.'
                ],
                'purpose': "The defensive purpose of left and right boxing steps is to angle off and create angles of attack or defense, enabling evasion of opponent's strikes while setting up advantageous positions for counterattacks.",
                'image_url': '/static/images/left_right.gif'
            },
            'slipping': {
                'description': [
                    'Prerequisite: Boxing stance',
                    'Slip to the RIGHT: Knees bent, shift slightly to the right.',
                    'Slip to the LEFT: Knees bent, shift slightly to the left.'
                ],
                'purpose': "The defensive technique of slipping involves skillfully moving the head offline from specific punches, such as jabs and crosses allowing the boxer to evade the attack while staying in position to counter effectively.",

                'image_url': '/static/images/slippling.gif'
            },
            'rolling': {
                'description': [
                    'Prerequisite: Boxing stance',
                    'Roll to the RIGHT: Knees bent, roll shoulders and move head to the right.',
                    'Roll to the LEFT: Knees bent, roll shoulders and move head to the left.'
                ],
                'purpose': "The defensive technique of rolling involves smoothly rotating the body away from an opponent's punches, particularly effective against hooks and looping shots, enabling the boxer to deflect the force of the blow and maintain positioning for counterattacks.",
                'image_url': '/static/images/rolling.gif'
            },
            'parrying': {
                'description': [
                    'Prerequisite: Boxing stance',
                    'Parry RIGHT: Use your right hand to deflect incoming punches.',
                    'Parry LEFT: Use your left hand to deflect incoming punches.'
                ],
                'purpose': "The defensive technique of parrying entails deflecting specific types of punches, such as jabs and crosses with precise hand movements, redirecting their force away from oneself, thereby minimizing the impact and creating openings for counterattacks.",
                'image_url': '/static/images/parrying.gif'
            }
        }
    }
}



quizData = {
    "1": {
        "id": "1",
        "Given": "",
        "Question": "Select one or more techniques needed to construct a orthodox boxing stance.",
        "answer": ["choice3","choice4","choice5"],
        "choice1": {
            "validity": "Incorrect",
            "explanation": "Orthodox: Right foot is to be pivot and raise.",
            "value": "Turn left feet 30 degree to the left vipot the heal, Slight raise in left foot"
        },
        "choice2":{
            "validity": "Incorrect",
            "explanation": "Orthodox: Step forward with left ",
            "value": "Step forward with right foot"
        },
         "choice3": {
            "validity": "Correct",
            "explanation": "Used for both SouthPaw and Orthodox",
            "value": "Slight bent in both knees"
        },
        "choice4":{
            "validity": "Correct",
            "explanation": "Used for both SouthPaw and Orthodox",
            "value": "Even distribution of weight on both legs"
        },
        "choice5":{
            "validity": "Correct",
            "explanation": "Used for both SouthPaw and Orthodox",
            "value": "Chin, Elbow are tucked and Guard is up"
        }
    },
    "2": {
        "id": "2",
        "Given": "Given these offense: Jab to face → Cross to head.",
        "Question": "Select the best defense that suits this offense.",
         "answer": ["choice1"],
        "type": "Choose One Answer",
        "choice1": {
            "validity": "Correct",
            "explanation": "First, slipping left or right enables you to move your head off the centerline, making it harder for your opponent to land punches. Following this with a parry to the cross allows you to deflect or redirect the opponent's punch, further reducing the chance of getting hit.",
            "value": "Slip then parry cross"
        },
        "choice2": {
            "validity": "Incorrect",
            "explanation": "This is not the most optimal because rolling a jab could leave you unbalance. Usually rolling comes after a slip",
            "value": "roll then slip"
        },
        "choice3": {
            "validity": "Incorrect",
            "explanation": "Parrying does defend the jab but rolling a cross is not optimal since you might be unbalance due to having shift weight on both legs so quickly. ",
            "value": "parry then roll"
        }
    },
        "3": {
        "id": "3",
        "Given": "Given these offense : Jab → Cross → Hook",
        "Question": "Select the best defense that suits this offense.",
        "answer": ["choice1"],
        "type": "Choose One Answer",
        "choice1": {
            "validity": "Correct",
            "explanation": "when slipping we move your head off the centerline, making it harder for your opponent to land punches. Then parrying helps deflect the cross and that gives us time to notice the hook which we can roll under since it is more bigger.",
            "value": "Slip then parry then roll"
        },
        "choice2": {
            "validity": "Incorrect",
            "explanation": "Parrying a jab works, rolling a cross might take us off balance which can make delay our parry of the hook leading to getting hit. ",
            "value": "parry then roll then parry"
        },
        "choice3": {
            "validity": "Incorrect",
            "explanation": "Rolling a jab can make us unbalance and a rolling usually are for hooks and we usually do it after a slip. Slipping the cross helps us evade the cross but stepping back might not be enough to defend the hook since the opponent could step forward",
            "value": "Roll then slip then step back"
        }
    },
     "4": {
        "id": "4",
        "Given": "Given these offense: Double Jab → Cross → Hook",
        "Question": "Select the best defense that suits this offense.",
        "answer": ["choice1"],
        "type": "Choose One Answer",
        "choice1": {
            "validity": "Correct",
            "explanation": "when slipping we move your head off the centerline, making it harder for your opponent to land the jab. We step back and then parry the next incoming jab because the opponent would have to step forward when double jab. Parrying the cross deflects it and we roll to avoid the hook",
            "value": "Slip left/right , stepback and parry, parry, roll"
        },
        "choice2": {
            "validity": "Incorrect",
            "explanation": "rolling a jab might throw you off balance and rolling again for the coming jab is not optimal since the opponent could adjust his jab angles.",
            "value": "roll, roll, slip, roll"
        },
        "choice3": {
            "validity": "Incorrect",
            "explanation": "We can’t roll on cross due to it taking us off balance due to the speed of the cross and delay from parrying to a roll. Also, we can slip a hook since we can still get hit. ",
            "value": "parry, parry, roll, slip"
        }
    }
    ,
    "5": {
        "id": "5",
        "Given": "Given these offense: Feint Jab → Lead Hook →  Rear cross",
        "Question": "Select the best defense that suits this offense.",
        "answer": ["choice1"],
        "type": "Choose One Answer",
        "choice1": {
            "validity": "Correct",
            "explanation": "We avoid the jab by reading the feint, and while reading the feint we step ourself for rolling so we roll the hook and can continue to roll to avoid the cross. We are stable when we have started and it is hard to connect a cross when a person is rolling stably.",
            "value": "Read the feint, roll, roll"
        },
        "choice2": {
            "validity": "Incorrect",
            "explanation": "We can’t roll on cross due to it taking us off balance due to the speed of the cross and delay from parrying to a roll.",
            "value": "Read the feint, parry, roll"
        },
        "choice3": {
            "validity": "Incorrect",
            "explanation": "We can’t slip a hook since it is not efficient and we can still get hit by the offense. Getting hit from the hook can wobble us and prevent the next slip that we need for the cross.",
            "value": "Read the feint, slip, slip "
        }
    }
}

quizScore = 0

@app.route('/')
def home():
   return render_template('home.html')

@app.route('/lesson')
def lesson_welcome():
    return render_template('lesson_welcome_page.html')

@app.route('/specific_lesson/<stance_name>')
def specific_lesson(stance_name):
    stance_info = stances.get(stance_name.lower())
    if not stance_info:
        return "Stance not found", 404
    return render_template('lesson.html', stance=stance_info)

@app.route('/quiz')
def quiz():
   return render_template('quiz_welcome_page.html')

@app.route('/quiz/<element_id>')
def quiz_content(element_id):
    global quizScore
    global quizData
    # print(element_id=='1')
    if(element_id =='1'):
        quizScore = 0
        for key in quizData.keys():
           quizData[key]['select']=None
           print(quizData[key]['select'])

       
    current_data = quizData[element_id]
    # print("current data", current_data)
    return render_template('quiz_content.html', current_data=current_data, quizData=quizData)


@app.route('/summary')
def summary():
   return render_template('summary.html', quizScore=quizScore, quizData=quizData)

@app.route('/update_quiz', methods=['POST'])
def update_quiz():
   global quizScore
   json_data = request.get_json()
   result = json_data["total"]
   quizScore +=result
#    print(quizScore)
   return jsonify({'message': 'Quiz updated successfully'})

@app.route('/select', methods=['POST'])
def select():
   global quizData
   json_data = request.get_json()
   curr_id = json_data['id']
   arr =  json_data['selected']
   quizData[str(curr_id)]['select'] = arr
#    print(quizData[str(curr_id)])
   return jsonify({'message': 'Quiz updated successfully'})
   
if __name__ == '__main__':
   app.run(debug = True)




