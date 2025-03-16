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

for(container of postContainerElements){
   container.addEventListener('dragover', (event) => {
        event.preventDefault();
    })

    container.addEventListener('dragenter', (event) => {
        if(event.target.classList.contains('card-container')){
            event.target.classList.add('dragover');
           
        }
    })

    container.addEventListener('dragleave', (event) => {
        event.target.classList.remove('dragover');
    })

    container.addEventListener('drop', (event) => {
        console.log(event.target.parentElement);
        console.log(event.currentTarget)
        console.log(event.target)
        event.target.classList.remove('dragover');
        if(event.target.parentElement.classList.contains('card-body')){
            event.currentTarget.insertBefore(dragged, event.target.parentElement);
            return;
        }
        event.currentTarget.appendChild(dragged);
})
}

const clearModal = () =>{
    newPostBtn.classList.toggle('postBtn-clicked');
    document.querySelector('#postTitle').value = '';
    document.querySelector('#postBody').value = '';
    document.querySelector('.modal-error').style.display = 'none';
    postModalElement.style.display = 'none';
}

const handleDelete = (event) =>{
    const postRemove = document.querySelector(`#${event.target.getAttribute('id')}`);
    event.target.parentElement.remove(postRemove);
}

newPostBtn.addEventListener('click', () => {
    if(postModalElement.style.display == 'flex'){
        clearModal();
        return;
    }
    newPostBtn.classList.toggle('postBtn-clicked');
    postModalElement.style.display = "flex";

});

cancelPostBtn.addEventListener('click', clearModal);

newSubmitBtn.addEventListener('click', (event) =>{
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
    
    newPost.addEventListener('dragstart', (event) => {
        dragged = event.target;
        event.target.classList.add('dragging');
    });

    newPost.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
    });

    document.querySelector(`.${document.querySelector('input[name="status"]:checked').value}`).append(newPost);
    clearModal();
});


for(test of testElements){
test.addEventListener('dragstart', (event) => {
    dragged = event.target;
    event.target.classList.add('dragging');
    // event.dataTransfer.setDragImage(event.target, 0, 0);
});
test.addEventListener('dragend', (event) => {
    event.target.classList.remove('dragging');
});
test.addEventListener('click', handleDelete);
test.addEventListener('click', () => console.log('test clicked'));
}
