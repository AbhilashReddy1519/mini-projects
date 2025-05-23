document.addEventListener('DOMContentLoaded', () => {
    const arrows = document.querySelector('.completed h1 span');
    const complete_container = document.querySelector('.complete-container');
    arrows.addEventListener('click', () => {
        arrows.classList.toggle('rotate');
        complete_container.classList.toggle('hide');
        
    });

    const btn = document.getElementById("btn");
    const task = document.getElementById("task");
    const show = document.querySelector('.pending');
    const pending_container = document.getElementById("pending-container");
    btn.addEventListener('click', () => {
        if(task.value === "") {
            alert("Enter task before adding. 😎");
            return;
        }
        show.style.display = "block";
        let li = document.createElement('li');
        li.innerText = task.value;
        pending_container.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "&cross;";
        li.appendChild(span);
        task.value = "";
        saveData();
    });

    pending_container.addEventListener('click', (e) => {
        if(e.target.tagName === 'LI') {
            const completedTask = e.target.cloneNode(true);
            completedTask.classList.add('done');
            complete_container.appendChild(completedTask);
            e.target.remove();
            saveData();
            // we cannot do both append and remove at once
        } else if(e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
            saveData();
        }
        if(pending_container.children.length === 0) {
            show.style.display = "none";
            saveData();
        }
    });

    complete_container.addEventListener('click', (e)=> {
        if(e.target.tagName === 'LI') {
            const revoke = e.target.cloneNode(true);
            revoke.classList.remove('done');
            
            if(pending_container.children.length === 0) {
                show.style.display = "block";
            }
            pending_container.appendChild(revoke);
            e.target.remove();
            saveData();
        } else if(e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
            saveData();
        }
    });


    function saveData() {
        localStorage.setItem('pending-data', pending_container.innerHTML);
        localStorage.setItem('complete-data', complete_container.innerHTML);
    }

    function showData() {
        pending_container.innerHTML = localStorage.getItem('pending-data');
        complete_container.innerHTML = localStorage.getItem('complete-data');
        if(pending_container.children.length != 0) {
            show.style.display = "block";
        }
        
    }
    showData();
});