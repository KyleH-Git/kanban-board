const newPostBtn = document.querySelector('.postBtn');
const newSubmitBtn = document.querySelector('.submitBtn');
const cancelPostBtn = document.querySelector('.cancelBtn')
const postModalElement = document.querySelector('.post-modal');

newPostBtn.addEventListener('click', () => {
    postModalElement.style.display = "flex";
});

cancelPostBtn.addEventListener('click', () => {
    postModalElement.style.display = "none";
});

newSubmitBtn.addEventListener('click', () =>{
    event.preventDefault();
    const newPost = document.createElement('div');
    const newPostTitle = document.createElement('div');
    newPostTitle.innerText = document.querySelector('#postTitle').value;
    const newPostBody = document.createElement('div');
    newPostBody.innerText = document.querySelector('#postBody').value;
    newPost.append(newPostTitle, newPostBody);
    newPost.classList.add('card-body');
    console.log(document.querySelector('input[name="status"]').value)
    document.querySelector(`.${document.querySelector('input[name="status"]:checked').value}`).children[1].append(newPost);
    document.querySelector('#postTitle').value = '';
    document.querySelector('#postBody').value = '';
    postModalElement.style.display = 'none';
});
