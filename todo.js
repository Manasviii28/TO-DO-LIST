 let todolist=JSON.parse(localStorage.getItem('todos')||"[]");
        let editingindex=null;
        let filtermode="all";
        list();

        function key(event){
            if(event.key=='Enter'){
                addtodo();
            }
        }
        
        function addtodo(){
            editingindex = null;
            const inputelement=document.querySelector('.input');
            if(inputelement.value.trim()!=""){
                let object={
                    text:inputelement.value,completed:false
                };
                todolist.push(object);
            }
            inputelement.value="";
        
            list();
            localStorage.setItem('todos',JSON.stringify(todolist));
            //let todolist=JSON.parse(localStorage.getItem('inputelement'));
            
        }
        function list(){
            let todohtml="";
            let br="<br>";
           // document.querySelector('.list').innerHTML=todolist.join('<br>');
            for(let i=0;i<todolist.length;i++){
                let del=`<button class="delete" onclick="deletetodo(${i})">delete</button>`;
                let btn=`<button onclick="comptodo(${i})">completed</button>`;
                //let del="<button onclick='deletetodo("+i+")'>delete</button>";
                let edit=`<button onclick="edittodo(${i})">Edit</button>`;
                let todo = todolist[i];

                if (filtermode === "active" && todo.completed === true) {
                    continue;
                }

                if (filtermode === "completed" && todo.completed === false) {
                    continue;
                }
                    
                 
                
                if (i === editingindex) {
                    todohtml += `
                        <input id="edit-${i}" value="${todo.text}" onkeydown='editkey(event,${i})'>
                        <button onclick="savetodo(${i})">Save</button>
                        <button onclick="canceledit()">Cancel</button>
                        <br>
                    `;
                } else {
                    let todoText = todo.text;

                    if (todo.completed) {
                        todoText = `<s>${todoText}</s>`;
                    }

                    //todohtml += todoText + del + btn + edit + br;
                    todohtml += `
                                <div class="todo">
                                    <span>${todoText}</span>
                                    <div class="actions">
                                    ${btn}
                                    ${edit}
                                    ${del}
                                    </div>
                                </div>
                                `;
                }
                
                
            }

            document.querySelector('.list').innerHTML=todohtml;
             todohtml="";

        }
        function deletetodo(index){
            todolist.splice(index,1);
            list();
            localStorage.setItem('todos',JSON.stringify(todolist));

            
        }
        function comptodo(index){
            todolist[index].completed=!todolist[index].completed;
            list();
             localStorage.setItem('todos',JSON.stringify(todolist));
        }
        
        function edittodo(index){
           editingindex=index;
            list();
            
        }

        function savetodo(index){
            let input = document.querySelector(`#edit-${index}`);
            todolist[index].text = input.value;

            editingindex = null;

            list();
            localStorage.setItem('todos', JSON.stringify(todolist));
        }
        function editkey(event,index){
            if(event.key=='Enter'){
                savetodo(index);
            }
        }

        function canceledit(){
            editingindex = null;
            list();
        }
        function changefilter(value){
            filtermode=value;
            list();
        }