document.getElementById('imageInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const imageContainer = document.getElementById('imageContainer');
    const message = document.getElementById('message');
    
    imageContainer.innerHTML = '';
    message.innerText = '';

    if (files.length === 0) {
        message.innerText = 'Vui lòng chọn ít nhất một ảnh!';
        return;
    }

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageBox = document.createElement('div');
            imageBox.classList.add('image-box');

            const img = document.createElement('img');
            img.src = e.target.result;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'X';
            deleteBtn.classList.add('delete-btn');

            deleteBtn.addEventListener('click', function() {
                imageContainer.removeChild(imageBox);
            });

            imageBox.appendChild(img);
            imageBox.appendChild(deleteBtn);
            imageContainer.appendChild(imageBox);
        }

        reader.readAsDataURL(file);
    });
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const imageContainer = document.getElementById('imageContainer');
    const saveMessage = document.getElementById('saveMessage');

    if (imageContainer.children.length === 0) {
        saveMessage.innerText = 'Bạn chưa tải ảnh nào!';
        return;
    }

    const savedImages = [];

    for (let i = 0; i < imageContainer.children.length; i++) {
        const imgElement = imageContainer.children[i].querySelector('img');
        savedImages.push(imgElement.src);
    }

    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    saveMessage.innerText = 'Bài đã được lưu thành công!';
    
    imageContainer.innerHTML = '';
});

document.getElementById('viewSavedBtn').addEventListener('click', function() {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    const imageContainer = document.getElementById('imageContainer');
    const saveMessage = document.getElementById('saveMessage');

    imageContainer.innerHTML = '';

    if (savedImages.length === 0) {
        saveMessage.innerText = 'Không có bài nào đã lưu!';
        return;
    }

    savedImages.forEach((src, index) => {
        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');

        const img = document.createElement('img');
        img.src = src;

        const deleteSavedBtn = document.createElement('button');
        deleteSavedBtn.innerText = 'Xóa';
        deleteSavedBtn.classList.add('delete-btn');

        deleteSavedBtn.addEventListener('click', function() {
            savedImages.splice(index, 1);
            localStorage.setItem('savedImages', JSON.stringify(savedImages));
            viewSavedImages();
        });

        imageBox.appendChild(img);
        imageBox.appendChild(deleteSavedBtn);
        imageContainer.appendChild(imageBox);
    });

    saveMessage.innerText = 'Đã hiển thị các bài đã lưu!';
});

function viewSavedImages() {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';

    if (savedImages.length === 0) {
        document.getElementById('saveMessage').innerText = 'Không có bài nào đã lưu!';
        return;
    }

    savedImages.forEach((src, index) => {
        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');

        const img = document.createElement('img');
        img.src = src;

        const deleteSavedBtn = document.createElement('button');
        deleteSavedBtn.innerText = 'Xóa';
        deleteSavedBtn.classList.add('delete-btn');

        deleteSavedBtn.addEventListener('click', function() {
            savedImages.splice(index, 1);
            localStorage.setItem('savedImages', JSON.stringify(savedImages));
            viewSavedImages();
        });

        imageBox.appendChild(img);
        imageBox.appendChild(deleteSavedBtn);
        imageContainer.appendChild(imageBox);
    });
}
