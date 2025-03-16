const newPostBtn = document.querySelector('.postBtn');
const newSubmitBtn = document.querySelector('.submitBtn');
const cancelPostBtn = document.querySelector('.cancelBtn')
const postModalElement = document.querySelector('.post-modal');
const postContainerElements = document.querySelectorAll('.card-container')
const todoContainerElement = document.querySelector('.todo');
const workingContainerElement = document.querySelector('.working');
const doneContainerElement = document.querySelector('.done');


const testElements = document.querySelectorAll('.test');
let dragged;
const storedPosts = JSON.parse(localStorage.getItem('storedPosts'));


//function to reset modal form values
const clearModal = () =>{
    newPostBtn.classList.toggle('postBtn-clicked');
    document.querySelector('#postTitle').value = '';
    document.querySelector('#postBody').value = '';
    document.querySelector('.modal-error').style.display = 'none';
    postModalElement.style.display = 'none';
}

//function to handle modal form submit, generates new elements, captures and assigns user input to them,
//attatches unique ID, styling + event listeners for dragstart/end/enter/leave to the card,
//creates an obj copy of the element to store in local storage, adds post to selected container + clears modal
const handlePost = (event) => {
    event.preventDefault();
    const newPost = document.createElement('div');
    const newPostTitle = document.createElement('div');
    const newPostBody = document.createElement('div');
    const postDeleteBtn = document.createElement('div');
    const userTitle = document.querySelector('#postTitle').value;
    const userBody = document.querySelector('#postBody').value;
    newPost.setAttribute('draggable', true);
    newPost.setAttribute('id', crypto.randomUUID());
    if(userTitle){
        newPostTitle.innerText = userTitle;
    }else {
        document.querySelector('.modal-error').innerText = 'Please enter a task name!';
        document.querySelector('.modal-error').style.display = 'block';
        return;
    }
    if(userBody){
        newPostBody.innerText = userBody;
    }else {
        document.querySelector('.modal-error').innerText = 'Please enter a task description!';
        document.querySelector('.modal-error').style.display = 'block';
        return;
    }
    postDeleteBtn.innerText = 'Delete'
    newPostTitle.classList.add('post-header');
    newPostBody.classList.add('post-body');
    postDeleteBtn.classList.add('post-delete');
    postDeleteBtn.addEventListener('click', handleDelete);
    newPost.append(newPostTitle, newPostBody, postDeleteBtn);
    newPost.classList.add('card-body');
    newPost.classList.add(`${document.querySelector('input[name="status"]:checked').value}`);
    newPost.addEventListener('dragstart', (event) => {
        dragged = event.target;
        event.target.classList.add('dragging');
    });

    newPost.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
    });

    newPost.addEventListener('dragenter', (event) => {
        if(event.currentTarget.parentElement.classList.contains('card-container')){
            event.currentTarget.parentElement.classList.add('dragover');
        }
    })

    newPost.addEventListener('dragleave', (event) => {
        event.target.classList.remove('dragover');
    })

    const postObj = {
        ID: newPost.getAttribute('id'),
        title: newPostTitle.innerText,
        body: newPostBody.innerText,
        container: document.querySelector('input[name="status"]:checked').value,
    }
    
    if(storedPosts){
    storedPosts.push(postObj);
    localStorage.setItem('storedPosts', JSON.stringify(storedPosts));
    }else{
        newStoredPosts = [postObj]
        localStorage.setItem('storedPosts', JSON.stringify(newStoredPosts));
    }

    document.querySelector(`.${document.querySelector('input[name="status"]:checked').value}`).append(newPost);
    clearModal();
}

//handles removing clicked element from container and removing it from the array in local storage
const handleDelete = (event) =>{
    for(post of storedPosts){
        if(storedPosts.length == 1){
            storedPosts.pop();
        }
        if(event.target.parentElement.getAttribute('id') == post.ID){
            storedPosts.splice(storedPosts.indexOf(post), 1)
        }
    }
    localStorage.setItem('storedPosts', JSON.stringify(storedPosts));
    const postRemove = document.querySelector(`#${event.target.getAttribute('id')}`);
    event.target.parentElement.remove(postRemove);
 
}

//event listeners for New To-do, cancel, and delete buttons

newPostBtn.addEventListener('click', () => {
    if(postModalElement.style.display == 'flex'){
        clearModal();
        return;
    }
    newPostBtn.classList.toggle('postBtn-clicked');
    postModalElement.style.display = "flex";

});

cancelPostBtn.addEventListener('click', clearModal);

newSubmitBtn.addEventListener('click', handlePost);

//attatching event listeners to all container elements for styling on dragover/leave 
//and handling drop
for(container of postContainerElements){
    container.addEventListener('dragover', (event) => {
         event.preventDefault();
     })
 
     container.addEventListener('dragenter', (event) => {
         if(event.target.classList.contains('card-container') ){
             event.target.classList.add('dragover');
         }
     })
 
     container.addEventListener('dragleave', (event) => {
         if(!event.target.classList.contains('card-body') )
             event.target.classList.remove('dragover');
     })
 
     container.addEventListener('drop', (event) => {
         event.target.classList.remove('dragover');
         for(post of storedPosts){
             if(dragged.getAttribute('id') == post.ID){
                 post.container = event.currentTarget.classList[0]
             }
         }
         
         localStorage.setItem('storedPosts', JSON.stringify(storedPosts));
         if(event.target.parentElement.classList.contains('card-body')){
             event.currentTarget.insertBefore(dragged, event.target.parentElement);
             event.currentTarget.classList.remove('dragover');
             return;
         }
         event.currentTarget.classList.remove('dragover');
 
         event.currentTarget.appendChild(dragged);
 })
 }
 
// old test code

// for(test of testElements){
// test.addEventListener('dragstart', (event) => {
//     dragged = event.target;
//     event.target.classList.add('dragging');
//     // event.dataTransfer.setDragImage(event.target, 0, 0);
// });
// test.addEventListener('dragend', (event) => {
//     event.target.classList.remove('dragging');
// });
// test.addEventListener('click', handleDelete);
// test.addEventListener('click', () => console.log('test clicked'));
// }


//on page load, iterate through storedPosts if there are any, create new elements + assign them values from local storage,
//append the stored post to the correct container
window.onload = (event) => {
    if(storedPosts){
        for(post of storedPosts){
            const newPost = document.createElement('div');
            const newPostTitle = document.createElement('div');
            const newPostBody = document.createElement('div');
            const postDeleteBtn = document.createElement('div');
            newPostTitle.innerHTML = post.title;
            newPostBody.innerHTML = post.body;
            newPost.setAttribute('draggable', true);
            newPost.setAttribute('id', post.ID);
            postDeleteBtn.innerText = 'Delete'
            newPostTitle.classList.add('post-header');
            newPostBody.classList.add('post-body');
            postDeleteBtn.classList.add('post-delete');
            postDeleteBtn.addEventListener('click', handleDelete);
            newPost.append(newPostTitle, newPostBody, postDeleteBtn);
            newPost.classList.add('card-body');
            
            newPost.addEventListener('dragstart', (event) => {
                dragged = event.target;
                event.target.classList.add('dragging');
            });

            newPost.addEventListener('dragend', (event) => {
                event.target.classList.remove('dragging');
            });

            newPost.addEventListener('dragenter', (event) => {
                if(event.currentTarget.parentElement.classList.contains('card-container')){
                    event.currentTarget.parentElement.classList.add('dragover');
                }
            })

            newPost.addEventListener('dragleave', (event) => {
                event.target.classList.remove('dragover');
            })

            document.querySelector(`.${post.container}`).append(newPost);
        }
    }
}