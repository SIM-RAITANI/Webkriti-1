document.querySelector('.button').addEventListener('click', function () {
   let i=document.querySelector("i");
    var leftBox = document.querySelector('.left-box');
    if (leftBox.style.display === 'none') {
        leftBox.style.display = 'block';
        i.style.color="white";

    } else {
        leftBox.style.display = 'none';
        i.style.color="black"
    }
});
// function showDiv(divNumber) {
//     // Hide all divs
//     const divs = document.querySelectorAll('.content');
//     divs.forEach(div => div.style.display = 'none');

//     // Show the selected div
//     document.getElementById(`div${divNumber}`).style.display = 'block';
// }
// document.getElementById('imageUpload').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             // Update the src of the existing image with the new image
//             document.getElementById('imagePreview').src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// });


//to logout user
// Define the media query


const mediaQuery = window.matchMedia('(max-width: 600px)');

// Function to handle changes in the media query
function handleMediaQueryChange(e) {
    let rightBox = document.querySelector('.right-box');
    let leftBox = document.querySelector('.left-box');
    let button = document.querySelector('.button');
    let icon = document.querySelector('i'); // Assuming there's an icon inside the button

    if (e.matches) {
        // The viewport is 600px or less
        console.log('Viewport is 600px or less');
        // leftBox.style.display = 'block';  // Hide the dashboard by default
        rightBox.style.display = 'none';
        icon.style.color="white"; // Show the container by default

        button.addEventListener('click', function () {
            if (leftBox.style.display === 'block') {
                leftBox.style.display = 'block';
                rightBox.style.display = 'none';  // Hide the container when dashboard is shown
                icon.style.color = 'white'; 
                console.log("hello none");
                 // Change icon color or any other styles
            } else {
                leftBox.style.display = 'none';
                rightBox.style.display = 'flex'; // Show the container when dashboard is hidden
                icon.style.color = 'black';
                console.log("hello block");
                  // Reset icon color or any other styles
            }
        });

        function change(){
            leftBox.style.display="none";
        }
    } else {
        // The viewport is wider than 600px
        console.log('Viewport is wider than 600px');
        leftBox.style.display = 'block';
        rightBox.style.display = 'flex';
    }
}

// Add a listener for changes in the media query's match status
mediaQuery.addEventListener('change', handleMediaQueryChange);

// Call the function immediately to check the initial state
handleMediaQueryChange(mediaQuery);



