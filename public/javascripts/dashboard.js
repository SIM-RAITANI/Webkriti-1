document.querySelector('.button').addEventListener('click', function () {
    var leftBox = document.querySelector('.left-box');
    if (leftBox.style.display === 'none') {
        leftBox.style.display = 'block';
    } else {
        leftBox.style.display = 'none';
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
