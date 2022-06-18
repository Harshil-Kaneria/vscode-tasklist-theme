var MainDataArray = [];

$( document ).ready(function() {
    list_html()
});

function random_number(){
    return (Math.floor(Math.random() * 1000) + 1).toString()+Date.now()+(Math.floor(Math.random() * 1000) + 1).toString();
}

function add_item_list(){

    var id = random_number();
    var title = $("#title_text").val();
    var description = $("#description_text").val();
    var tag = $("#tag_text").val();
    var priority = $("#priority_id").val();
    var status = $("#status_id").val();
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();

    var list_data = {
        id,
        title,
        description,
        tag,
        priority,
        status,
        start_date,
        end_date
    };

    MainDataArray.push(list_data);
    Update_Main_Data_File();
    
    $("#title_text").val("");
    $("#description_text").val("");
    $("#tag_text").val("");
    $("#priority_id").val("");
    $("#status_id").val("3");
    $("#start_date").val("");
    $("#end_date").val("");
    $('#start_date').attr('type', 'text')
    $('#end_date').attr('type', 'text')
}

function clear_full_list(){

    $.confirm({
        icon: 'fa fa-warning',
        theme: 'modern',
        closeIcon: true,
        animation: 'scale',
        type: 'red',
        title: 'Warning',
        content: 'Are You Sure Delete All Items',
        buttons: { 
            ok: function(){ 
                MainDataArray = [];
                localStorage.removeItem('todoList');
                Update_Main_Data_File(); 
            } 
        }
    });

}

function remove(id=""){

    $.confirm({
        icon: 'fa fa-warning',
        theme: 'modern',
        closeIcon: true,
        animation: 'scale',
        type: 'red',
        title: 'Warning',
        content: 'Are You Sure Delete Items',
        buttons: { 
            ok: function(){ 
                if(id!=""){
                    MainDataArray.forEach(function(item, index){
                        if(item.id==id){
                            MainDataArray.splice(index,1);
                        }
                    })
                    Update_Main_Data_File()
                } 
            } 
        }
    });
    
}

function Update_Main_Data_File(){

    var data = MainDataArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(data));
    list_html()

}

function list_html(){

    $("#todoList").html("");
    var list = localStorage.getItem('todoList');
    if(list != null){
        todos = JSON.parse(list);
        MainDataArray = todos;
        MainDataArray.forEach(function(ele){
            $("#todoList").append(generate_html_of_list(ele))
        })
    }

}

function generate_html_of_list(ele){

    let div =  `
    
        ${ele.status=="1"?'<li class="alert alert-success done row ">':''}
        ${ele.status=="2"?'<li class="alert alert-warning row ">':''}
        ${ele.status=="3"?'<li class="alert alert-danger row ">':''}
        ${ele.status=="4"?'<li class="alert alert-secondary row ">':''}

            <div style="display:none" class="col-12">
                <label>${ele.id}</label>
            </div>
            <div class="col-12 d-flex main_heading_task_list">
                <div class="col-5">
                    <label><b>${ele.title}</b></label>
                </div>
                <div class="form-group d-flex">
                    <select class="btn btn-sm form-control-sm bg-light">
                        <option ${ele.status=="1"?'Selected':''} value="1">Complete - ✔️</option>
                        <option ${ele.status=="2"?'Selected':''} value="2">InProgress - 🚀</option>
                        <option ${ele.status=="3"?'Selected':''} value="3">Incomplete - ⌛</option>
                        <option ${ele.status=="4"?'Selected':''} value="4">Hold - 🛑</option>
                    </select>
                    <input  class="btn btn-sm bg-white form-control-sm" value="${ele.tag}" />
                    <button class="btn btn-primary" onclick="edit(${ele.id})">📝</button>
                    <button class="btn btn-danger" onclick="remove(${ele.id})">❌</button>
                </div>
            </div>
            <div class="mt-3 col-12 d-flex main_description_task_list">
                <div class="col-5">
                    <label>${ele.description}</label>
                </div>
                <div class="form-group d-flex">
                    <select class="btn btn-sm form-control-sm bg-light">
                        <option ${ele.priority==""?'Selected':''} value="">Select Priority</option>
                        <option ${ele.priority=="3"?'Selected':''} value="3">High - ⏫</option>
                        <option ${ele.priority=="2"?'Selected':''} value="2">Med - ➖</option>
                        <option ${ele.priority=="1"?'Selected':''} value="1">Low - ⏬</option>
                    </select>
                    <input  class="btn btn-sm bg-light form-control-sm" type="${ele.start_date!=""?"datetime-local":"text"}" placeholder="Start Date" value="${ele.start_date}" onclick="(this.type='datetime-local');this.showPicker()" />
                    <input  class="btn btn-sm bg-light form-control-sm" type="${ele.end_date!=""?"datetime-local":"text"}" placeholder="End Date" value="${ele.end_date}" onclick="(this.type='datetime-local');this.showPicker()" />
                </div>
            </div>
        </li>
    `; 

    return div;

}