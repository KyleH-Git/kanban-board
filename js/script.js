const newPostBtn = document.querySelector('.postBtn');
const newSubmitBtn = document.querySelector('.submitBtn');
const cancelPostBtn = document.querySelector('.cancelBtn')
const postModalElement = document.querySelector('.post-modal');


const clearModal = () =>{
    document.querySelector('#postTitle').value = '';
    document.querySelector('#postBody').value = '';
    document.querySelector('.modal-error').style.display = 'none';
    postModalElement.style.display = 'none';
}

const postDrag = () =>{

}

newPostBtn.addEventListener('click', () => {
    if(postModalElement.style.display == 'flex'){
        clearModal();
        return;
    }
    postModalElement.style.display = "flex";

});

cancelPostBtn.addEventListener('click', clearModal);

newSubmitBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    const newPost = document.createElement('div');
    const newPostTitle = document.createElement('div');
    const newPostBody = document.createElement('div');
    const userTitle = document.querySelector('#postTitle').value;
    const userBody = document.querySelector('#postBody').value;
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
    newPost.append(newPostTitle, newPostBody);
    newPost.classList.add('card-body');
    newPost.addEventListener('drag', postDrag);
    document.querySelector(`.${document.querySelector('input[name="status"]:checked').value}`).children[1].append(newPost);
    clearModal();
});
