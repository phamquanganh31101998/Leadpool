<template>
    <v-btn>Click here</v-btn>
</template>
<script>
import contactService from '../../services/contacts.service'
export default {
    data(){
        return{
            allContacts: [],
            phoneNumberToSend: []
        }
    },
    methods: {
        getAllContact(){
            contactService.getAllContact('5d1dd258f0aa61074608b0e3', 1).then(result => {
                
                for (let i = 1; i <= result.response.totalPage;i++){
                    contactService.getAllContact('5d1dd258f0aa61074608b0e3', i).then(result => {
                        for(let k = 0; k < result.response.results.length; k++){
                            result.response.results[k].chosen = true;
                            this.allContacts.push(result.response.results[k]);
                        }
                    })
                }

                //Đoan log này này mảng allContacts có phần tử xong length là 0
                console.log(this.allContacts)
                console.log(this.allContacts.length)


                for (let i = 0; i < this.allContacts.length; i++){
                    this.phoneNumberToSend.push(this.allContacts[i].phone)
                }
                
            })
        },
    },
    created(){
        this.getAllContact();
    }
}
</script>
<style>

</style>