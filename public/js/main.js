function deleteEvent() {
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')
    
    axios.delete('/events/delete/'+ id)
    .then( (res)=> {
        alert('event was deleted')
        window.location.href = '/events/:pageNo'
    })

    .catch( (err)=> {
        console.log(err)
    })

}

//upload avatar 

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()
 
        
        reader.onload = function(e) {
            let image = document.getElementById("imagePlaceholder")
            image.style.display = "block"
            image.src = e.target.result

        }

        reader.readAsDataURL(input.files[0])
    }
}