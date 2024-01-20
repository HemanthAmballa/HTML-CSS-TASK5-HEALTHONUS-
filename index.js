let popUpblock = document.getElementsByClassName("main_div")[0];
let divBlock = document.getElementsByClassName("div_block")[0];
let FormValue = document.getElementsByClassName("form_div")[0];
let EditFormValue = document.getElementsByClassName("form_divTwo")[0];
let displayBlock = document.getElementsByClassName("display_block")[0];
let Editblock = document.getElementsByClassName("sub_div")[0];

let cname = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let landline = document.getElementById("landline");
let website = document.getElementById("website");
let textarea = document.getElementById("address");


let name1 = document.getElementById("name1");
let email1 = document.getElementById("email1");
let phone1 = document.getElementById("phone1");
let landline1 = document.getElementById("landline1");
let website1 = document.getElementById("website1");
let textarea1 = document.getElementById("address1");

let book = new contactBook();

localStorage.removeItem('obj');

loadData();

let editId;

function openPopup(){
  
    popUpblock.classList.remove("hide");
    spanreversal(0);
    FormValue.reset();
    hideData();

}
    
function closePopUp(e, bool) {
            if(bool){
                if(e.target.classList.contains("main_div")){
                     popUpblock.classList.add("hide");
                  }
             }
            else{
                e.preventDefault();
                if(Validiteform(e,cname,email,phone,landline,website,textarea,0)){
                    popUpblock.classList.add("hide");
                    book.Add(new ContactGenerator({
                                name:cname.value,
                                email:email.value,
                                phone:phone.value,
                                landline : landline.value,
                                website : website.value,
                                textarea:textarea.value
                        }));
                    loadData();
                    FormValue.reset();
                }else{
                    
                     return false;
                }
            }
} 

    
function loadData(){
    
    divBlock.innerHTML ="";
   
    book.getAll().forEach((val,i)=>{
     let str = `
            <div onclick="loadFullData(${val.id})" class="border_blocks">
                <div class="sub_blocks">
                    <h5>${val.name}</h5>
                    <h5>${val.email}</h5>
                    <h5>${"+91 "+val.phone}</h5>
                </div>
                    
             </div>
         `
      divBlock.innerHTML = divBlock.innerHTML + str;

        })
    }

function loadFullData(index){
           
          let data = book.getById(index);
          document.querySelector(".display_h1").innerHTML = data.name;
          document.querySelector(".edit_img").src= "edit1.jpg";
          document.querySelector(".del_img").src="delete1.png";
          document.querySelector(".editbtn").innerText = "Edit";
          document.querySelector(".editbtn").setAttribute("data-id", index.toString());
          document.querySelector(".delbtn").innerText = "Delete";
          document.querySelector(".delbtn").setAttribute("data-id", index.toString());
          document.querySelector(".h5_one").innerHTML = "Email:  "+data.email
          document.querySelector(".h5_two").innerHTML = "Phone: "+"+91 "+data.phone.substring(0,3)+" "+data.phone.substring(3,6)+" "+data.phone.substring(6,11)
          document.querySelector(".h5_three").innerHTML = "Landline: "+data.landline.substring(0,3)+" "+data.landline.substring(3,5)+" "+data.landline.substring(5)
          document.querySelector(".h5_four").innerHTML = "website: "+data.webiste
          document.querySelector(".h5_five").innerHTML = "Address: "+ data.textarea.split("\n").map((val)=>{ return `${val}\n` }).join("\n");
}


 function editData(e){
        let id =  Number(e.target.getAttribute("data-id"));
     
        let data = book.getById(id);
        Editblock.classList.remove("hide");                    
        name1.value = data.name;
        email1.value = data.email;
        phone1.value = data.phone;
        landline1.value = data.landline;
        website1.value = data.webiste;
        textarea1.value = data.textarea;
        editId = id;
        hideData();
 }


 function delData(e){
       
       book.deleteByID(e.target.getAttribute("data-id"))
       hideData();
       loadData();
 }

 function hideData(){

        document.querySelector(".display_h1").innerHTML = ""
        document.querySelector(".edit_img").src= ""
        document.querySelector(".del_img").src=""
        document.querySelector(".editbtn").innerText =""
        document.querySelector(".editbtn").setAttribute("data-id","");
        document.querySelector(".delbtn").innerText = ""
        document.querySelector(".delbtn").setAttribute("data-id", "");
        document.querySelector(".h5_one").innerHTML = ""
        document.querySelector(".h5_two").innerHTML = ""
        document.querySelector(".h5_three").innerHTML =""
        document.querySelector(".h5_four").innerHTML = ""
        document.querySelector(".h5_five").innerHTML = ""
 }

 function EditPopUp(e, bool) {
    if(bool){
       
     if(e.target.classList.contains("sub_div")){
             Editblock.classList.add("hide");
             spanreversal(1);
          }
     }
    else{
        
        if(Validiteform(e,name1,email1,phone1,landline1,website1,textarea1,1)){
        e.preventDefault();
        Editblock.classList.add("hide");
        book.editById(new ContactGenerator({id:editId,
                                            name:name1.value,
                                            email:email1.value,
                                            phone:phone1.value,
                                            landline : landline1.value,
                                            website : website1.value,
                                            textarea:textarea1.value
          }))                                      
        loadData();
       
        }else{
            return false;
        }
      }
} 


function validateName(arg,num){
  
    var name = arg.value;
    var spanval =   document.getElementsByClassName("span_one")[num];
    if(name!=""){
       
        spanval.innerHTML="*";
        return true;
     }else {
        spanval.innerHTML="Name is Required";
        return false;
     }
}

function  validateEmail(arg,num){
      
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(arg.value);  
    var spanval =   document.getElementsByClassName("span_two")[num];
    if(isValid && arg.value!="" ){
     
        spanval.innerHTML="*";
        return true;
    }else if(!isValid && arg.value!=""){

        spanval.innerHTML="Invalid Email";
        return false;
    }else{
        spanval.innerHTML="Email is Required";
        return false;

    }
}

function validatePhone(arg,num){

    var phoneval = arg.value;
    var phonevalidation = /^\d{10}$/;
    var spanval =   document.getElementsByClassName("span_three")[num];
    if(phoneval!=""&& phoneval.match(phonevalidation)){
      
        spanval.innerHTML="*";
        return true;
    }else if(phoneval!=""&& !phoneval.match(phonevalidation)){
        spanval.innerHTML="Invalid";
        return false;
    }
    else{
        spanval.innerHTML="Required";
        return false;
     }
}


function validateLandline(arg,num){
    var lvalue = arg.value;
    var landlinevalidation = /^\d{12}$/;
    var spanval =   document.getElementsByClassName("span_four")[num];
    if(lvalue!=""&& lvalue.match(landlinevalidation)){
       
        spanval.innerHTML="*";
        return true;
    }else if(lvalue!=""&& !lvalue.match(landlinevalidation)){
        spanval.innerHTML="Invalid";
        return false;
    }
    else{
        spanval.innerHTML="Required";
        return false;
     }

}
function validateWebsite(arg,num){
    var wname = arg.value;
    var spanval =   document.getElementsByClassName("span_five")[num];
    if(wname!=""){
       
        spanval.innerHTML="*";
        return true;
     }else{
        spanval.innerHTML="Website is Required";
        return false;
     }


}
function validateTarea(arg,num){

    var tname = arg.value;
    var spanval =   document.getElementsByClassName("span_six")[num];
    if(tname!=""){
        
        spanval.innerHTML="*";
        return true;
     }else{
        spanval.innerHTML="Address is Required";
        return false;
     }

}



function spanreversal(num){
    document.getElementsByClassName("span_one")[num].innerHTML="*";
    document.getElementsByClassName("span_two")[num].innerHTML="*";
    document.getElementsByClassName("span_three")[num].innerHTML="*";
    document.getElementsByClassName("span_four")[num].innerHTML="*";
    document.getElementsByClassName("span_five")[num].innerHTML="*";
    document.getElementsByClassName("span_six")[num].innerHTML="*";
}



function Validiteform(event,arg1,arg2,arg3,arg4,arg5,arg6,num){
let nameStatus = validateName(arg1,num),emailStatus = validateEmail(arg2,num),phoneStatus= validatePhone(arg3,num),landlineStatus = validateLandline(arg4,num),
            websiteStatus =  validateWebsite(arg5,num) ,textareaStatus = validateTarea(arg6,num);

   
    event.preventDefault();

   if( nameStatus&& emailStatus&& phoneStatus&& landlineStatus&& websiteStatus&& textareaStatus){
        return true;
   }
    return false;
   
    
}

    
