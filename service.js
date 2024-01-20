
class contactBook{
              
    contacts = [

        new ContactGenerator({id:1,
                                 name:"Bharatreddy Damireddy",
                                 email:"Bharatreddy@healthonus.com",
                                 phone: "9292929292",
                                 landline : "040333377637",
                                 website : "http://healthonus.com",
                                 textarea:"Hyderabad" 
                                 }),
        new ContactGenerator({id:2,
                                 name:"Raja Damireddy",
                                 email:"raja@healthonus.com",
                                 phone: "8458948594",
                                 landline : "010333377637",
                                 website : "http://healthonus.com",
                                 textarea:"Guntur" 
                                 }),
        new ContactGenerator({id:3,
                                 name:"Jeevan Kumar",
                                 email:"jeevan@healthonus.com",
                                 phone: "9838478733",
                                 landline : "020333377637",
                                 website : "http://healthonus.com",
                                 textarea:"Visakhapatnam" 
                                 }),
         new ContactGenerator({id:4,
                                 name:"Raheem Shaik",
                                 email:"raheem@healthonus.com",
                                 phone: "7477837834",
                                 landline : "030333377637",
                                 website : "http://healthonus.com",
                                 textarea:"Vijayawada" 
                                 }),    
 

     ];

    constructor(){}

    Add(contact){
        this.contacts.push({...contact,id:Math.ceil(Math.random() * 1000)});
        localStorage.setItem("obj",JSON.stringify(this.contacts));
        return this.contacts;
    }
    getAll(){

        if(localStorage.getItem("obj")==null){

            localStorage.setItem("obj",JSON.stringify(this.contacts));

        }else{

            this.contacts = JSON.parse(localStorage.getItem("obj"))
        }

      
       
        return this.contacts;
    }
    getById(id){

        this.contacts = JSON.parse(localStorage.getItem("obj")) || [];
        return  this.contacts.find((val,i)=> val.id ===id);
    }
    deleteByID(id){

        this.contacts = JSON.parse(localStorage.getItem("obj")) || [];
        this.contacts = this.contacts.filter((val,i) => val.id != id );
         
         localStorage.setItem("obj",JSON.stringify(this.contacts));
        return this.contacts;
    }
    editById(contact){
        console.log(contact.id)
        this.contacts = JSON.parse(localStorage.getItem("obj")) || [];

      this.contacts =  this.contacts.map((con)=>{
                if(con.id===contact.id){
                    return contact;
                }else{
                    return con
                }
        })
        
        localStorage.setItem("obj",JSON.stringify(this.contacts));
        return this.contacts
    }

}
