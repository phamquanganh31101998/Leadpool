<template>
    <div class="main-editor">
        <button class="btn" @click="clickTranslate()">Run</button>
        <div class="first" contenteditable>
            writecode
        </div>
        <iframe class="second">
        </iframe>
    </div>
</template>
<script>
export default {
    data(){
        return{
            first: null,
            iframe: null,
            btn: null
        }
    },
    methods: {
        setupPage(){
            this.first = document.querySelector(".first");
            this.iframe = document.querySelector("iframe");
            this.btn = document.querySelector("button");

            // btn.addEventListener("click", () => {
                
            // });


            // first.addEventListener('keyup',()=>{
                
            // })

            // first.addEventListener("paste", function(e) {
            //     e.preventDefault();
                
            // });
        },
        clickTranslate(){
            var html = first.textContent;
            iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
        },
        keyupTranslate(){
            var html = first.textContent;
            iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
        },
        pasteTranslate(){
            var text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
        }
    },
    created(){
        this.setupPage();
    }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}


.btn {
  poistion:fixed;
  right:0;
   padding: 0.4rem;
  width: 4rem;
  background: rgb(0, 0, 0);
  color: gold;
  font-size: 1rem;
  outline:none;
  cursor:pointer;
   height:90vh;
}
.btn:hover{
   color:white;
   background: blue;
}


.main-editor {
  background: rgba(0, 0, 0, 0.91);
  display: flex;
  width: 100%;
  padding: 1rem;
  box-shadow:0 2px 3px black;
  position:fixed;
  height:100vh;
   justify-content: center;
    align-items: center;
  border: 7px solid #36383f;
}

.first {
  background-color: #ffffff;
  width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: pre;
  box-shadow: 0 1px 1px rgb(22, 22, 22);
  outline: none;
  padding: 0.4rem;
  height: 90vh;
}

.second {
  background-color: rgb(255, 255, 255);
  width: 50%;
  overflow-y: auto;
  white-space: pre;
  right: 0;
  box-shadow: 0 1px 1px rgb(22, 22, 22);
  padding: 0.4rem;
  height: 90vh;
}
</style>