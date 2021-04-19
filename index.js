const form=document.querySelector('#task-form')
const taskList=document.querySelector('.collection')
const clrBtn=document.querySelector('.clear-tasks')
const filter=document.querySelector('#filter')
const taskInput=document.querySelector('#task')
const taskTitle=document.querySelector('#task-title')

loadEventListeners();


function loadEventListeners(e)
{
    //DOM content loading event
    document.addEventListener('DOMContentLoaded',getTasks)
    //Add task event
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click',removeTask);
    //clear task event
    clrBtn.addEventListener('click',clearTasks)
    //filter tasks event
    filter.addEventListener('keyup',filterTasks)


}

function addTask(e) {
    e.preventDefault();

    //create new list item
    const li=document.createElement('li');

    //add class to list item
    li.className='collection-item';
    //create new text node 
    const text=document.createTextNode(taskInput.value);
    //append text node to li
    li.appendChild(text);
    //create link tag
    const link=document.createElement('a');
    //add class to link tag

    link.className='delete-item secondary-content';
    //create inner HTML for link tag
    link.innerHTML='<i class="fa fa-remove"></i>'
    //appen list item to add link tag to it
    li.appendChild(link);
    //append li to ul
    if(li.innerText!=="")
        taskList.appendChild(li);  
    else
        alert("Task input is empty, no task is entered to add!")


    //store task to local Storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value='';

    const len=JSON.parse(localStorage.getItem('tasks')).length;

    if(len!==0)
        taskTitle.innerText=`Tasks(${len})`
    else
        taskTitle.innerText='Tasks';

    
}
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks))

}


function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item'))
        if(confirm("Are you sure?"))
           { 
               const task=e.target.parentElement.parentElement.innerText;
               e.target.parentElement.parentElement.remove();
               const arr=JSON.parse(localStorage.getItem('tasks'))

               arr.splice(arr.indexOf(task),1);
               const len=arr.length;
               localStorage.setItem('tasks',JSON.stringify(arr));

               document.querySelector('#task-title').innerText=`Tasks(${len})`

            }


}


function clearTasks(e) {
    if(confirm("Are you sure?"))
    {   while(taskList.firstChild)
            taskList.removeChild(taskList.firstChild);
        localStorage.clear()
        taskTitle.innerText='Tasks';
    }
}   

function filterTasks(e) {
    const text=e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item=task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text)!=-1)
        {
            task.style.display='block';
        }
        else
        {
            task.style.display='none';
        }
    })


}

function getTasks()
{ 
    if(localStorage.getItem('tasks')!==null)
        {
            const len=JSON.parse(localStorage.getItem('tasks')).length;
            document.querySelector("#task-title").innerText=`Tasks(${len})` 
        }
    

    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li=document.createElement('li');
        //add class to list item
        li.className='collection-item';
        //create new text node 
        const text=document.createTextNode(task);
        //append text node to li
        li.appendChild(text);
        //create link tag
        const link=document.createElement('a');
        //add class to link tag
    
        link.className='delete-item secondary-content';
        //create inner HTML for link tag
        link.innerHTML='<i class="fa fa-remove"></i>'
        //appen list item to add link tag to it
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

