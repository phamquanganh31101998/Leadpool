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
                    <v-list-tile @click="page = 'create', grape()">
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
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <div class="panel__top" style="width: 100%">
                            <div class="panel__basic-actions" style="width: 100%"></div>
                            <div class="panel__switcher"></div>
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <div class="editor-row">
                            <div class="editor-canvas">
                                <div id="gjs">...</div>
                            </div>
                            <div class="panel__right">
                                <div class="layers-container"></div>
                                <div class="styles-container"></div>
                                <div class="traits-container"></div>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <div id="blocks" style="width: 100%"></div>
                    </v-flex>
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
            height: '300px',
            width: 'auto',
            // Disable the storage manager for the moment
            storageManager: {
                id: 'gjs-',             // Prefix identifier that will be used inside storing and loading
                type: 'local',          // Type of the storage
                autosave: true,         // Store data automatically
                autoload: true,         // Autoload stored data on init
                stepsBeforeSave: 1,     // If autosave enabled, indicates how many changes are necessary before store method is triggered
                storeComponents: true,  // Enable/Disable storing of components in JSON format
                storeStyles: true,      // Enable/Disable storing of rules in JSON format
                storeHtml: true,        // Enable/Disable storing of components as HTML string
                storeCss: true,         // Enable/Disable storing of rules as CSS string
            },
            layerManager: {
                appendTo: '.layers-container'
            },
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
                        {
                            id: 'show-layers',
                            active: true,
                            label: 'Layers',
                            command: 'show-layers',
                            // Once activated disable the possibility to turn it off
                            togglable: false,
                        }, 
                        {
                            id: 'show-style',
                            active: true,
                            label: 'Styles',
                            command: 'show-styles',
                            togglable: false,
                        },
                        {
                            id: 'show-traits',
                            active: true,
                            label: 'Traits',
                            command: 'show-traits',
                            togglable: false,
                        }
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
                        id: 'section', // id is mandatory
                        label: '<b>Chia phần</b>', // You can use HTML/SVG inside labels
                        attributes: { class:'gjs-block-section' },
                        content: `<section>
                        <h1>This is a fuck</h1>
                        <div>This is juLorem adasdsadsadset</div>
                        </section>`,
                    }, {
                        id: 'text',
                        label: 'Text',
                        content: '<div data-gjs-type="text">Viết vào đây here</div>',
                    }, {
                        id: 'image',
                        label: 'Image',
                        // Select the component once it's dropped
                        select: true,
                        // You can pass components as a JSON instead of a simple HTML string,
                        // in this case we also use a defined component type `image`
                        content: { type: 'image' },
                        // This triggers `active` event on dropped components and the `image`
                        // reacts by opening the AssetManager
                        activate: true,
                    }
                ]
            },
            styleManager: {
                appendTo: '.styles-container',
                sectors: [{
                    name: 'Dimension',
                    open: false,
                    // Use built-in properties
                    buildProps: ['width', 'min-height', 'padding'],
                    // Use `properties` to define/override single property
                    properties: [
                    {
                        // Type of the input,
                        // options: integer | radio | select | color | slider | file | composite | stack
                        type: 'integer',
                        name: 'The width', // Label for the property
                        property: 'width', // CSS property (if buildProps contains it will be extended)
                        units: ['px', '%'], // Units, available only for 'integer' types
                        defaults: 'auto', // Default value
                        min: 0, // Min value, available only for 'integer' types
                    }
                    ]
                },{
                    name: 'Extra',
                    open: false,
                    buildProps: ['background-color', 'box-shadow', 'custom-prop'],
                    properties: [
                    {
                        id: 'custom-prop',
                        name: 'Custom Label',
                        property: 'font-size',
                        type: 'select',
                        defaults: '32px',
                        // List of options, available only for 'select' and 'radio'  types
                        options: [
                        { value: '12px', name: 'Tiny' },
                        { value: '18px', name: 'Medium' },
                        { value: '32px', name: 'Big' },
                        ],
                    }
                    ]
                }]
            },
            });
            this.editor.BlockManager.add('my-block-id', {
            // ...
                content: {
                    tagName: 'div',
                    draggable: true,
                    label: '<p style="fontSize: 30px; color: red;">Hihi</p>',
                    attributes: { 'some-attribute': 'some-value' },
                    components: [
                    {
                        tagName: 'span',
                        content: '<b>Content tĩnh</b>',
                    }, {
                        tagName: 'div',
                        // use `content` for static strings, `components` string will be parsed
                        // and transformed in Components
                        components: '<span>HTML at some point</span>',
                    }
                    ]
                }
            })
            this.editor.Panels.addPanel({
                id: 'panel-top',
                el: '.panel__top',
                });
            this.editor.Panels.addPanel({
                id: 'basic-actions',
                el: '.panel__basic-actions',
                buttons: [
                    {
                        id: 'visibility',
                        active: true, // active by default
                        className: 'btn-toggle-borders',
                        label: '<u>B</u>',
                        command: 'sw-visibility', // Built-in command
                    }, 
                    {
                        id: 'export',
                        className: 'btn-open-export',
                        label: 'Exp',
                        command: 'export-template',
                        context: 'export-template', // For grouping context of buttons from the same panel
                    }, 
                    {
                        id: 'show-json',
                        className: 'btn-show-json',
                        label: 'JSON',
                        context: 'show-json',
                        command(editor) {
                            editor.Modal.setTitle('Components JSON')
                            .setContent(`<textarea style="width:100%; height: 250px;">
                                ${JSON.stringify(editor.getComponents())}
                            </textarea>`)
                            .open();
                        },
                    }
                ],
            });
            this.editor.on('run:export-template:before', opts => {
                console.log('Before the command run');
                });
            this.editor.on('run:export-template', () => console.log('After the command run'));
            this.editor.on('abort:export-template', () => console.log('Command aborted'));
            this.editor.Commands.add('show-layers', {
                getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
                getLayersEl(row) { return row.querySelector('.layers-container') },

                run(editor, sender) {
                    const lmEl = this.getLayersEl(this.getRowEl(editor));
                    lmEl.style.display = '';
                },
                stop(editor, sender) {
                    const lmEl = this.getLayersEl(this.getRowEl(editor));
                    lmEl.style.display = 'none';
                },
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
            console.log(this.editor)
        },
        alerting(){
            alert('hú');
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
  background-color: #78366a;
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
  top: 0;
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
</style>