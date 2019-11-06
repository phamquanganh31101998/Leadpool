<template>
    <v-content class="mt-5 pl-3 pr-3">
        <v-layout row wrap>
            <v-flex xs12 sm12 md5 lg6 xl6>
                <h1 style="position: absolute; font-size: 36px;" class="ml-3">Email</h1>
                <br>
                <br>
            </v-flex>
            <v-flex xs12 sm12 md7 lg6 xl6>
                <v-layout row>
                    <!-- <v-flex xs5 sm5 md5 lg5 xl5 offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5>
                        <v-text-field append-icon="search" v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex> -->
                    <!-- <v-flex xs2 md2 lg2 xl2>
                        <v-btn dark color="warning" @click="createTask = true">Create Task</v-btn>
                    </v-flex> -->
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mt-5" :divider="divider"></v-divider>
        <v-layout row wrap>
            <v-flex xs2 sm2 md2 lg2 xl2>
                <v-list>
                    <v-list-tile @click="page = 'manage'">
                        <v-list-tile-content :style="fontWeight[0]">
                            Quản lý mẫu email
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="page = 'create'">
                        <v-list-tile-content :style="fontWeight[1]">
                            Tạo mẫu email
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <br>
                <v-divider :divider="divider"></v-divider>
                <!-- <v-select v-model="status" :items="statusToChoose" label="Status" style="width: 60%;" class="ml-2"></v-select> -->
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10 v-if="page=='manage'">
                <!-- <v-layout row>
                    <v-flex xs3 sm3 md3 lg3 xl3 class="ml-3 mt-3">
                        <v-card>
                            <v-card-title>
                                <h3 style="padding-top: 8px; position: absolute; font-size: 18px;">Chọn mẫu</h3>
                            </v-card-title>
                            <v-card-text>
                                <span class="ml-4" ><v-select :items="templateSelect" v-model="templateId" @input="setChosenTemplate()"></v-select></span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs9 sm9 md9 lg9 xl9 class="ml-3 mt-3">
                        <v-card>
                            <v-card-title>
                                <h3 style="padding-top: 8px; position: absolute; font-size: 18px;">Nội dung mẫu</h3>
                            </v-card-title>
                            <v-card-text>
                                <div id="templateBody" style="width: 100%; margin: 10px; border: 1px solid #DDDDDD"></div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout> -->
            </v-flex>
            <v-flex xs10 sm10 md10 lg10 xl10 v-if="page=='create'">
                <v-layout>
                    <v-btn color="primary" @click="grape(), create.btn = false" v-if="create.btn">Bắt đầu tạo mẫu</v-btn>
                </v-layout>
                <!-- <v-layout>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <div class="panel__top" style="width: 100%">
                            <div class="panel__basic-actions" style="width: 100%"></div>
                            <div class="panel__switcher"></div>
                        </div>
                    </v-flex>
                </v-layout> -->
                <v-layout row wrap style="height: 600px">
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-layout>
                            <v-flex xs1 sm1 md1 lg1 xl1>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-icon color="primary" dark v-on="on">help</v-icon>
                                    </template>
                                    <span>Tooltip</span>
                                </v-tooltip>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs2 sm2 md2 lg2 xl2>
                                <div id="blocks" style="width: 100%; height: 100%;" ></div>
                            </v-flex>
                            <v-flex xs10 sm10 md10 lg10 xl10>
                                <div class="editor-row" style="height: 100%">
                                    <div class="editor-canvas">
                                        <div id="gjs" style="height: 600px;"></div>
                                    </div>
                                    <div class="panel__right" >
                                        <div class="layers-container"></div>
                                        <div class="styles-container"></div>
                                        <div class="traits-container"></div>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                        
                    </v-flex>
                </v-layout>
                <br>
                <br>
                <v-layout>
                    <v-btn color="primary" block @click="create.dialog = true">Tạo mẫu mới</v-btn>
                </v-layout>
                <!-- <v-layout>
                    <div class="panel__top">
                        <div class="panel__basic-actions"></div>
                    </div>
                    <div class="editor-row">
                    <div class="editor-canvas">
                        <div id="gjs">...</div>
                    </div>
                    <div class="panel__right">
                        <div class="layers-container"></div>
                    </div>
                    </div>
                    <div id="blocks"></div>
                </v-layout> -->
            </v-flex>
        </v-layout>
        <v-dialog v-model="create.dialog" width="30%" persistent>
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Tạo mẫu email mới</span>
                </v-card-title>
                <v-card-text>
                    <span class="mt-4"><strong>Tên mẫu </strong></span>
                    <span class="ml-4"><v-text-field v-model="create.name"></v-text-field></span>
                </v-card-text>
                <v-divider :divider="divider"></v-divider>
                <v-card-actions>
                    <v-btn flat color="primary" @click="createNewTemplate()" :disabled="create.name == ''">Tạo</v-btn>
                    <v-btn flat color="red" @click="create.dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="createTask" persistent max-width="700px">
            <v-card>
                <v-card-title style="background-color:#1E88E5;color:#fff">
                    <span class="headline">Create Task</span>
                </v-card-title>
                <v-card-text>
                    <newTask :idAccount="this.idAccount" :idContact="this.idContact" @closeCreateTaskDialog="closeCreateTaskDialog()"/>
                </v-card-text>
            </v-card>
        </v-dialog> -->
    </v-content>
</template>
<script>
import emailService from '../../services/email.service'
export default {
    data(){
        return{
            page: 'manage',
            fontWeight: ['font-weight: bold', ''],
            templates: [],
            templateSelect: [],
            templateId: '',
            chosenTemplate: null,
            htmlText: '',
            divider: true,
            editor: null,
            create: {
                dialog: false,
                name: '',
                btn: true
            }
        }
    },
    props: {
        idAccount: {
            type: String,
            default: null
        }
    },
    watch: {
        page(){
            this.fontWeight = ['',''];
            if(this.page == 'manage'){
                this.fontWeight[0] = 'font-weight: bold';
            }
            else {
                this.fontWeight[1] = 'font-weight: bold';
            }
        },
    },
    methods: {
        getEmailTemplate(){
            emailService.getEmailTemplate(this.idAccount).then(result => {
                this.templates = result.response;
                this.templateSelect = [];
                this.templateSelect = this.setSelectEmailTemplate(this.templates);
                // console.log(this.templates);
            })
        },
        setSelectEmailTemplate(templateArray){
            let result = [];
            for (let i = 0; i < templateArray.length;i++){
                const obj = {
                    text: templateArray[i].title,
                    value: templateArray[i].emailTemplateId
                }
                result.push(obj);
            }
            return result;
        },
        setChosenTemplate(){
            let obj = null;
            for (let i = 0; i < this.templates.length; i++){
                if(this.templates[i].emailTemplateId == this.templateId){
                    this.chosenTemplate = this.templates[i];
                }
            }
            let regex = /\\\"/gi
            this.htmlText = this.chosenTemplate.content;
            document.getElementById("templateBody").innerHTML = this.htmlText.replace(regex, "\"");
        },
        grape(){
            this.editor = null;
            this.editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: true,
            // Size of the editor
            height: '600px',
            width: '600px;',
            // Disable the storage manager for the moment
            storageManager: {
                id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
                type: 'local',          // Type of the storage
                autosave: true,         // Store data automatically
                autoload: false,         // Autoload stored data on init
                stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
                storeComponents: false,  // Enable/Disable storing of components in JSON format
                storeStyles: false,      // Enable/Disable storing of rules in JSON format
                storeHtml: true,        // Enable/Disable storing of components as HTML string
                storeCss: true,         // Enable/Disable storing of rules as CSS string
            },
            // layerManager: {
            //     appendTo: '.layers-container'
            // },
            traitManager: {
                appendTo: '.traits-container',
            },
            // We define a default panel as a sidebar to contain layers
            panels: {
                
                defaults: [{
                id: 'layers',
                el: '.panel__right',
                // Make the panel resizable
                resizable: {
                    maxDim: 350,
                    minDim: 200,
                    tc: 0, // Top handler
                    cl: 1, // Left handler
                    cr: 0, // Right handler
                    bc: 0, // Bottom handler
                    // Being a flex child we need to change `flex-basis` property
                    // instead of the `width` (default)
                    keyWidth: 'flex-basis',
                },
                buttons: [
                        // {
                        //     id: 'show-layers',
                        //     active: true,
                        //     label: 'Layers',
                        //     command: 'show-layers',
                        //     // Once activated disable the possibility to turn it off
                        //     togglable: false,
                        // }, 
                        // {
                        //     id: 'show-style',
                        //     active: true,
                        //     label: 'Styles',
                        //     command: 'show-styles',
                        //     togglable: false,
                        // },
                        // {
                        //     id: 'show-traits',
                        //     active: true,
                        //     label: 'Traits',
                        //     command: 'show-traits',
                        //     togglable: false,
                        // }
                    ]
                }]
            },
            selectorManager: {
                appendTo: '.styles-container'
            },
            blockManager: {
                appendTo: '#blocks',
                blocks: [

                    {
                        id: 'label',
                        label: '<h2>Tiêu đề</h2>',
                        content: '<h1 style="text-align: center;">Tiêu đề</h1>',
                    },
                    {
                        id: 'section',
                        label: '<h2>Đề mục</h2>',
                        content: '<div><h3>Đề mục</h3><p>Nội dung........</p></div>',
                    },
                    {
                        id: 'text',
                        label: '<h2>Văn bản</h2>',
                        content: '<div data-gjs-type="text" style="width: 100%">Đoạn văn bản........</div>',
                    }, 
                    {
                        id: 'image',
                        label: '<h2>Hình ảnh</h2>',
                        // Select the component once it's dropped
                        select: true,
                        // You can pass components as a JSON instead of a simple HTML string,
                        // in this case we also use a defined component type `image`
                        content: { type: 'image' },
                        // This triggers `active` event on dropped components and the `image`
                        // reacts by opening the AssetManager
                        activate: true,
                    },
                    {
                        id: 'link',
                        label: '<h2>Đường dẫn</h2>',
                        // Select the component once it's dropped
                        select: true,
                        // You can pass components as a JSON instead of a simple HTML string,
                        // in this case we also use a defined component type `image`
                        content: '<span><a href="http://www.google.com.vn">Đường dẫn đến.............</a></span>',
                        // This triggers `active` event on dropped components and the `image`
                        // reacts by opening the AssetManager
                        activate: true,
                    },
                    {
                        id: 'divider',
                        label: '<h2>Đường kẻ phân tách</h2>',
                        // Select the component once it's dropped
                        select: true,
                        // You can pass components as a JSON instead of a simple HTML string,
                        // in this case we also use a defined component type `image`
                        content: '<hr style="color: #DDDDDD">',
                        // This triggers `active` event on dropped components and the `image`
                        // reacts by opening the AssetManager
                        activate: true,
                    },
                    {
                        id: 'table',
                        label: '<h2>2 cột </h2>',
                        // Select the component once it's dropped
                        select: true,
                        // You can pass components as a JSON instead of a simple HTML string,
                        // in this case we also use a defined component type `image`
                        content: '<table ><tr><td style="width: 400px;"><div>Nội dung</div></td><td style="width: 400px;"><div>Nội dung</div></td></table>',
                        // This triggers `active` event on dropped components and the `image`
                        // reacts by opening the AssetManager
                        activate: true,
                    },
                    {
                        id: 'form',
                        label: '<h2>Thuộc tính</h2>',
                        select: true,
                        content: '<form><input type="text" disabled value="{{Contacts.firstName}}"></form>',
                        activate: true,
                    }
                ]
            },
            styleManager: {
                appendTo: '.styles-container',
                sectors: 
                [
                    {
                        name: 'Khoảng cách',
                        open: false,
                        // Use built-in properties
                        buildProps: ['width', 'height', 'padding-top' , 'padding-bottom' , 'padding-left' , 'padding-right', 
                        'margin-top', 'margin-bottom', 'margin-left', 'margin-right' ],
                        // Use `properties` to define/override single property
                        properties: [
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Chiều rộng</h3>', // Label for the property
                                property: 'width', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Chiều cao</h3>', // Label for the property
                                property: 'height', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Padding Top</h3>', // Label for the property
                                property: 'padding-top', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Padding Bottom</h3>', // Label for the property
                                property: 'padding-bottom', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Padding Left</h3>', // Label for the property
                                property: 'padding-left', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Padding Right</h3>', // Label for the property
                                property: 'padding-right', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },

                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Margin Top</h3>', // Label for the property
                                property: 'margin-top', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Margin Bottom</h3>', // Label for the property
                                property: 'margin-bottom', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Margin Left</h3>', // Label for the property
                                property: 'margin-left', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                            {
                                // Type of the input,
                                // options: integer | radio | select | color | slider | file | composite | stack
                                type: 'integer',
                                name: '<h3>Margin Right</h3>', // Label for the property
                                property: 'margin-right', // CSS property (if buildProps contains it will be extended)
                                units: ['px', '%'], // Units, available only for 'integer' types
                                defaults: 'auto', // Default value
                                min: 0, // Min value, available only for 'integer' types
                            },
                        ]
                    },
                    {
                        name: 'Chỉnh sửa nội dung',
                        open: true,
                        buildProps: ['background-color', 'font-family', 'custom-prop', 'color', 'font-size'],
                        properties: [
                            {
                                id: 'font-size',
                                name: '<h3>Cỡ chữ</h3>',
                                property: 'font-size',
                                type: 'integer',
                                units: ['px', '%'],
                                defaults: 'auto',
                                min: 1
                            },
                            {
                                id: 'font-family',
                                name: '<h3>Phông chữ</h3>',
                                property: 'font-family',
                                type: 'select',
                                defaults: 'auto',
                                // List of options, available only for 'select' and 'radio'  types
                                options: [
                                    { value: 'Arial', name: 'Arial' },
                                    { value: 'Times New Roman', name: 'Times New Roman' },
                                    { value: 'Roboto', name: 'Roboto' },
                                    { value: 'Georgia', name: 'Georgia' },
                                    { value: 'Helvetica', name: 'Helvetica' },
                                    { value: 'Tahoma', name: 'Tahoma' },
                                    { value: 'Verdana', name: 'Verdana' },
                                    { value: 'Impact', name: 'Impact' },
                                    { value: 'Brush Script MT', name: 'Brush Script MT' },
                                    { value: 'Trebuchet MS', name: 'Trebuchet MS' },
                                    { value: 'Courier New', name: 'Courier New' },
                                ],
                            },
                            {
                                id: 'custom-prop',
                                name: '<h3>Căn chỉnh</h3>',
                                property: 'text-align',
                                type: 'select',
                                defaults: 'auto',
                                // List of options, available only for 'select' and 'radio'  types
                                options: [
                                    { value: 'center', name: 'Chính giữa' },
                                    { value: 'left', name: 'Trái' },
                                    { value: 'right', name: 'Phải' },
                                    { value: 'justify', name: 'Căn đều hai bên' },
                                ],
                            },
                            {
                                id: 'background-color',
                                name: '<h3>Màu nền</h3>',
                                property: 'background-color',
                                type: 'color',
                                defaults: 'auto',
                            },
                            {
                                id: 'color',
                                name: '<h3>Màu chữ</h3>',
                                property: 'color',
                                type: 'color',
                                defaults: 'auto',
                            }
                        ]
                    }
                ]
            },
            assetManager: {
                assets: [
                    'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
                    // Pass an object with your properties
                    {
                        type: 'image',
                        src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
                        height: 350,
                        width: 250
                    },
                    {
                        // As the 'image' is the base type of assets, omitting it will
                        // be set as `image` by default
                        src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
                        height: 350,
                        width: 250
                    },
                ],
                uploadText: 'Kéo ảnh từ máy của bạn vào đây hoặc click vào để thêm ảnh',
                addBtnText: 'Thêm ảnh',
                handleAdd: (textFromInput) => {
                        // some check...
                        console.log(textFromInput)
                        this.editor.AssetManager.add(textFromInput);
                    }
                }
            });
            
            this.editor.Commands.add('show-styles', {
                getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
                getStyleEl(row) { return row.querySelector('.styles-container') },

                run(editor, sender) {
                    const smEl = this.getStyleEl(this.getRowEl(editor));
                    smEl.style.display = '';
                },
                stop(editor, sender) {
                    const smEl = this.getStyleEl(this.getRowEl(editor));
                    smEl.style.display = 'none';
                },
            });
            

            this.editor.on('asset:upload:start', opts => {
                console.log(opts)
            });
            this.editor.on('asset:remove', opts => {
                console.log(opts)
            });
            this.editor.on('asset:add', opts => {
                console.log(opts)
            });
            // The upload is ended (completed or not)
            this.editor.on('asset:upload:end', opts => {
                console.log(opts)
            });

            // Error handling
            this.editor.on('asset:upload:error', (err) => {
                console.log(err)
            });

            // Do something on response
            this.editor.on('asset:upload:response', (response) => {
                alert('hú');
            });

            console.log(this.editor)
        },
        alerting(){
            alert('hú');
        },
        createNewTemplate(){
            // let html = localStorage.getItem('gjs-html');
            // let css = localStorage.getItem('gjs-css');
            // // localStorage.removeItem('gjs-html');
            // // localStorage.removeItem('gjs-css');
            // let content = `<!DOCTYPE html><html><head><style>` + css + `</style></head><body>` + html + `</body></html>`
            // let body = {
            //     title: this.create.name,
            //     content: content,
            //     status: 'draft'
            // };
            // emailService.createEmailTemplate(this.idAccount, body).then(result => {
            //     console.log(result);
            // }).catch(error => {
            //     console.log(error);
            // }).finally(() => {
            //     this.create.dialog = false;
            // })
        }
    },

    created(){
        this.getEmailTemplate();
        // console.log(result)
        // this.grape()
    }
}
</script>
<style scoped>
/* We can remove the border we've set at the beginnig */
#gjs {
  border: none;
}
/* Theming */

/* Primary color for the background */
.gjs-one-bg {
  background-color: #47453e;
}

/* Secondary color for the text color */
.gjs-two-color {
  color: rgba(255, 255, 255, 0.7);
}

/* Tertiary color for the background */
.gjs-three-bg {
  background-color: #ec5896;
  color: white;
}

/* Quaternary color for the text color */
.gjs-four-color,
.gjs-four-color-h:hover {
  color: #ec5896;
}
/* Reset some default styling */
.gjs-cv-canvas {
  width: 100%;
  height: 100%;

}

.panel__top {
  padding: 0;
  width: 100%;
  display: flex;
  position: initial;
  justify-content: center;
  justify-content: space-between;
}
.panel__basic-actions {
  position: initial;
}
.editor-row {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 300px;
}

.editor-canvas {
  flex-grow: 1;
}

.panel__right {
  flex-basis: 230px;
  position: relative;
  overflow-y: auto;
}

.panel__switcher {
  position: initial;
}

.gjs-editor {
    padding-left: 50px;
}
</style>