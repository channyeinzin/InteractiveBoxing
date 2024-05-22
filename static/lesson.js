function displayLessonContent(stance) {
    let currentStepIndex = 0; // Start with the stance description
    const orderedCategories = [
        'steps_forward_backward', 
        'steps_left_right', 
        'slipping', 
        'rolling', 
        'parrying' // Ensure this is included and data is provided
    ];

    function displayStep() {
        $('#lesson_content').empty(); // Clear the content

        let contentHtml = '';
        // Determine whether we are showing the initial stance description or a specific step
        if (currentStepIndex === 0) {
            // Initial stance description
            const descriptionList = `${stance.description.map(desc => `<li class="list-group-item d_list">${desc}</li>`).join('')}`;
            contentHtml = `
                <div class="container-fluid mt-5 l_box">
                    <div class="row">
                        <div class="col-12 ">
                            <h1>${stance.name} Stance</h1>
                            <ol class="list-group list-group-numbered">${descriptionList}</ol>
                        </div>
                    </div>
                    <div class="row align-items-center"> 
                        <div class="col-12 text-center">
                            <br><br>
                            <img src="${stance.image_url}" alt="Image of ${stance.name} Stance" class="img-fluid img_b">
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Specific step based on current index, adjusting by 1 as index 0 is the stance description
            const categoryKey = orderedCategories[currentStepIndex - 1];
            const category = stance.common_steps[categoryKey];
            const title = categoryKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const stepsList = `${category.description.map(step => `<li class="list-group-item d_list">${step}</li>`).join('')}`;
            const categoryImage = category.image_url;
            contentHtml = `
                <div class="container-fluid mt-5 l_box">
                    <div class="row ">
                        <div class="col-12">
                            <h1>${title}</h1>
                            <p class="purpose">Purpose: ${category.purpose}</p>
                            <ul class="list-group">${stepsList}</ul>     
                        </div>
                    </div>
                    <div class="row align-items-center"> 
                        <div class="col-12 text-center">
                            <br><br>
                            <img src="${categoryImage}" alt="Image for ${title}" class="img-fluid img_b">
                        </div>
                    </div>
                </div>
            `;
        }

        $('#lesson_content').html(contentHtml);

        // Adjust the button display based on the current step
        let buttonControlsHtml = `
            <div class="row justify-content-center">
                <div class="col-12 text-center">
                    <br><br>
                    ${currentStepIndex > 0 ? '<button id="prev_step" class="btn btn-outline-secondary mr-2">Previous</button>' : ''}
                    ${currentStepIndex < orderedCategories.length ? '<button id="next_step" class="btn btn-outline-secondary">Next</button>' : ''}
                    ${currentStepIndex === orderedCategories.length ? '<button id="quiz_button" class="btn btn-outline-success">Take Quiz</button>' : ''}
                </div>
            </div>
        `;

        $('#lesson_content').append(buttonControlsHtml);

        // Handle "Next" and "Take Quiz" button clicks
        $('#next_step').click(() => {
            currentStepIndex++;
            displayStep();
        });

        $('#quiz_button').click(() => {
            window.location.href = '/quiz'; // Redirect to the quiz page
        });

        $('#prev_step').click(() => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                displayStep();
            }
        });
    }

    displayStep();
}

$(document).ready(function () {
    displayLessonContent(stance);
});
