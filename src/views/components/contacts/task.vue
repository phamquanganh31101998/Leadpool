<template>
    <v-layout row wrap>
        <v-flex offset-xs5 offset-sm5 offset-md5 offset-lg5 offset-xl5 v-if="progress">
            <v-progress-circular
                :size="70"
                :width="7"
                color="grey"
                indeterminate
            ></v-progress-circular>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-3 pr-3" v-else>
            <!-- <h3>June 2019</h3> -->
            
            <template v-for="task in tasks">
                <!-- notcomplete task -->
                <v-card class="pb-3 mt-3" v-if="task.status == 'NOTCOMPLETED'">
                    <v-card-title>
                        <v-layout row>
                            <v-flex xs4 sm4 md4 lg3 xl3>
                                <v-icon small left>
                                    calendar_today
                                </v-icon>
                                <span class="">Task</span>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4" v-if="checkOverdue(task.dueDate)">
                            <v-btn color="error" outline small class="ml-4">Overdue</v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-5 mt-3">
                            <v-layout row>
                                <v-btn small fab dark color="grey lighten-1" @click="updateTask(task.taskId, 'status', 'COMPLETED')"><v-icon>done</v-icon></v-btn>
                                <strong class="mt-3" style="width: 100%">
                                    <v-text-field
                                        style="fontSize: 18px;"
                                        v-model="task.title"
                                        solo
                                        flat
                                        @change="updateTask(task.taskId, 'title', task.title)"
                                    ></v-text-field>
                                </strong>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="mt-3">
                            <v-layout row>
                                <v-flex xs7 sm6 md5 lg4 xl3 class="pl-4">
                                    <v-layout row>
                                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-4">
                                            <span>Assigned to</span>
                                        </v-flex>
                                    </v-layout>
                                    <br>
                                    <v-layout row>
                                        <v-flex xs6 sm5 md4 lg3 xl2 class="ml-3 md-0">
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="grey lighten-2" small fab v-on="on">
                                                        <v-icon>person</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span style="margin: 0px;">{{task.assignedTo}}</span>
                                            </v-tooltip>
                                        </v-flex>
                                        <v-flex xs6 sm7 md8 lg8 xl9 class="ml-3 md-0">
                                            <v-menu :close-on-content-click="false" :nudge-width="100" offset-y max-width="400">
                                                <template v-slot:activator="{ on }">
                                                    <a color="indigo" v-on="on" style="margin-top: 16px;">
                                                        {{getNameFromEmail(task.assignedTo)}}
                                                    </a>
                                                </template>
                                                <v-card>
                                                    <v-card-title>
                                                        <v-layout row wrap>
                                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchEmail" ></v-text-field>
                                                            </v-flex>
                                                            <br>
                                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                                <v-select :items="searchedEmail" item-value="email" item-text="displayText" v-model="task.assignedTo" @change="updateTask(task.taskId, 'assignedTo', task.assignedTo)"></v-select>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-card-title>
                                                </v-card>
                                            </v-menu>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs5 sm6 md7 lg8 xl9>
                                    <v-layout row>
                                        <span>Due date</span>
                                    </v-layout>
                                    <v-layout row>
                                        <v-menu v-model="task.menu1" :close-on-content-click="false" :nudge-right="40" lazy
                                            transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <!-- <v-text-field v-model="task.dueDateDate" 
                                                persistent-hint prepend-icon="event" @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"
                                                v-on="on" style="width: 10px;">
                                                
                                                </v-text-field> -->
                                                <a color="indigo" v-on="on" style="margin-top: 20px; fontSize: 16px;">
                                                    {{task.dueDateDate}}
                                                </a>
                                            </template>
                                            <v-date-picker v-model="task.dueDateDate" no-title @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"></v-date-picker>
                                        </v-menu>
                                        <v-menu v-model="task.time1" :close-on-content-click="false" :nudge-right="40" lazy
                                            transition="scale-transition" offset-y full-width max-width="100px" min-width="100px">
                                            <template v-slot:activator="{ on }">
                                                <!-- <v-text-field v-model="task.dueDateDate" 
                                                persistent-hint prepend-icon="event" @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"
                                                v-on="on" style="width: 10px;">
                                                
                                                </v-text-field> -->
                                                <a color="indigo" v-on="on" style="margin: 20px; fontSize: 16px;">
                                                    {{task.dueDateTime}}
                                                </a>
                                            </template>
                                            <v-select
                                                style="padding: 0px 10px;"
                                                v-model="task.dueDateTime"
                                                :items="timeToChoose"
                                                @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"
                                            ></v-select>
                                        </v-menu>
                                        
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs12 sm12 md12 lg12 xl12 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl1>
                                    <br>
                                    <v-text-field
                                        v-model="task.note"
                                        solo
                                        flat
                                        @change="updateTask(task.taskId, 'note', task.note)"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-list-group sub-group no-action>
                                <template v-slot:activator>
                                    <v-list-tile>
                                        <v-list-tile-title><span>Details</span></v-list-tile-title>
                                    </v-list-tile>
                                </template>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>
                                            <v-layout row>
                                                <v-flex xs12 sm12 md12 lg10 xl8>
                                                    <v-layout row>
                                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                                            <span>Type</span>
                                                        </v-flex>
                                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                                            <span>Reminder</span>
                                                        </v-flex>
                                                        <!-- <v-flex v-if="task.emailReminder != null" xs2 sm2 md2 lg2 xl2>
                                                            <span>Time</span>
                                                        </v-flex> -->
                                                        <v-flex xs2 sm2 md2 lg2 xl2 v-if="task.emailReminder != null">
                                                            <span>Time</span>
                                                        </v-flex>
                                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                                            <span>Queue</span>
                                                        </v-flex>
                                                        <v-flex xs4 sm4 md4 lg4 xl4>
                                                            <span>Created by</span>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title>
                                            <v-layout row>
                                                <v-flex xs12 sm12 md12 lg10 xl8>
                                                    <v-layout row >
                                                        <v-flex xs2 sm2 md2 lg2 xl2 >
                                                            <span>
                                                                <v-menu :close-on-content-click="false" :nudge-width="75" top offset-y>
                                                                    <template v-slot:activator="{ on }">
                                                                        <a color="indigo" v-on="on">
                                                                            {{task.type}}
                                                                        </a>
                                                                    </template>
                                                                    <!-- <v-select :items="['To-do', 'Email', 'Call']" v-model="task.type" 
                                                                    style="backgroundColor: white; padding: 20px;" @change="updateTask(task.taskId, 'type', task.type)"></v-select> -->
                                                                    <v-list-tile @click="changeType(task.taskId, task.type, 'To-do')" style="backgroundColor: white;">
                                                                        <v-list-tile-title>To-do</v-list-tile-title>
                                                                    </v-list-tile>
                                                                    <v-list-tile @click="changeType(task.taskId, task.type, 'Email')" style="backgroundColor: white;">
                                                                        <v-list-tile-title>Email</v-list-tile-title>
                                                                    </v-list-tile>
                                                                    <v-list-tile @click="changeType(task.taskId, task.type, 'Call')" style="backgroundColor: white;">
                                                                        <v-list-tile-title>Call</v-list-tile-title>
                                                                    </v-list-tile>
                                                                </v-menu>
                                                            </span>
                                                        </v-flex>
                                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                                            <v-layout row wrap>
                                                                <v-flex xs12 sm12 md12 lg12 xl12>
                                                                    <v-menu :close-on-content-click="false" :nudge-width="200" top offset-y>
                                                                        <template v-slot:activator="{ on }">
                                                                            <a color="indigo" v-on="on" v-if="task.emailReminder == null">
                                                                                No reminder
                                                                            </a>
                                                                            <a color="indigo" v-on="on" v-else>
                                                                                {{task.emailReminderDate}}
                                                                            </a>
                                                                        </template>
                                                                        <v-list>
                                                                            <v-menu :close-on-content-click="false" offset-y v-model="task.date2" full-width max-width="290px" min-width="290px">
                                                                                <template v-slot:activator="{ on }">
                                                                                    <v-list-tile v-on="on">
                                                                                        <v-list-tile-title>Custom Date</v-list-tile-title>
                                                                                    </v-list-tile>
                                                                                </template>
                                                                                <v-date-picker v-model="task.emailReminderDate" no-title @change="updateTask(task.taskId, 'emailReminder', task.emailReminderDate + 'T' + task.emailReminderTime + ':00')" ></v-date-picker>
                                                                                   
                                                                            </v-menu>
                                                                            
                                                                            <v-list-tile @click="updateTask(task.taskId, 'emailReminder', '')">
                                                                                <v-list-tile-title >No reminder</v-list-tile-title>
                                                                            </v-list-tile>
                                                                        </v-list>
                                                                    </v-menu>
                                                                </v-flex>
                                                                <!-- <v-flex xs12 sm12 md12 lg12 xl12>
                                                                    <v-select
                                                                        v-if="task.emailReminder != null"
                                                                        v-model="task.emailReminderTime"
                                                                        :items="timeToChoose"
                                                                        label="Time"
                                                                        @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"
                                                                    ></v-select>
                                                                </v-flex> -->
                                                            </v-layout>
                                                            
                                                        
                                                        </v-flex>
                                                        <v-flex xs2 sm2 md2 lg2 xl2 v-if="task.emailReminder != null">
                                                            <span>
                                                                <v-menu :close-on-content-click="false" offset-y>
                                                                    <template v-slot:activator="{ on }">
                                                                        <a color="indigo" v-on="on" >
                                                                            {{task.emailReminderTime}}
                                                                        </a>
                                                                    </template>
                                                                    <v-select
                                                                        style="backgroundColor: white; padding: 0px 10px; width: 100px;"
                                                                        v-model="task.emailReminderTime"
                                                                        :items="timeToChoose"
                                                                        @change="updateTask(task.taskId, 'emailReminder', task.emailReminderDate + 'T' + task.emailReminderTime + ':00')"
                                                                    ></v-select>
                                                                </v-menu>
                                                            </span>
                                                        </v-flex>
                                                        <!-- <v-flex v-if="task.emailReminder != null" xs2 sm2 md2 lg2 xl2>
                                                            <span>
                                                                <v-menu :close-on-content-click="false" :nudge-width="75" top offset-y>
                                                                    <template v-slot:activator="{ on }">
                                                                        <a color="indigo" v-on="on">
                                                                            {{task.emailReminderTime}}
                                                                        </a>
                                                                    </template>
                                                                    <v-select
                                                                        style="margin-left: 20px; width: 20px; padding"
                                                                        v-model="task.emailReminderTime"
                                                                        :items="timeToChoose"
                                                                        @change="updateTask(task.taskId, 'emailReminder', task.emailReminderDate + 'T' + task.emailReminderTime + ':00')"
                                                                    ></v-select>
                                                                </v-menu>
                                                            </span>
                                                            <v-select
                                                                style="margin-left: 20px; width: 20px;"
                                                                v-model="task.emailReminderTime"
                                                                :items="timeToChoose"
                                                                dense
                                                                @change="updateTask(task.taskId, 'emailReminder', task.emailReminderDate + 'T' + task.emailReminderTime + ':00')"
                                                            ></v-select>
                                                        </v-flex> -->
                                                        <v-flex xs2 sm2 md2 lg2 xl2>
                                                            <span>None</span>
                                                        </v-flex>
                                                        <v-flex xs4 sm4 md4 lg4 xl4>
                                                            <span>{{task.createdByUser}}</span>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-group>
                        </v-flex>
                    </v-layout>
                </v-card>
                <!-- complete task -->
                <v-card class="pb-3 mt-3" v-else>
                    <v-card-title>
                        <v-layout row>
                            <v-flex xs4 sm4 md4 lg3 xl3>
                                <v-icon small left>
                                    calendar_today
                                </v-icon>
                                <span class="">Task</span>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pl-5 mt-1">
                            <v-layout row>
                                <v-btn small fab dark color="success" @click="updateTask(task.taskId, 'status', 'NOTCOMPLETED')" ><v-icon>done</v-icon></v-btn> 
                                <strong class="mt-3" style="width: 100%">
                                    <v-text-field
                                        v-model="task.title"
                                        solo
                                        flat
                                        @change="updateTask(task.taskId, 'title', task.title)"
                                    ></v-text-field>
                                </strong>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-list-group sub-group no-action>
                                <template v-slot:activator>
                                    <v-list-tile>
                                        <v-list-tile-title><span>Details</span></v-list-tile-title>
                                    </v-list-tile>
                                </template>
                                <v-list>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-title>
                                                <v-layout row>
                                                    <v-flex xs6 sm6 md6 lg3 xl4>
                                                        <v-layout row>
                                                            <span>Assigned to</span>
                                                        </v-layout>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg4 xl4>
                                                        <v-layout row>
                                                            <span class="pl-5">Due date</span>
                                                        </v-layout>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg5 xl4>
                                                        <v-layout row>
                                                            <span class="pl-4">Time</span>
                                                        </v-layout>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    
                                    <v-list-tile>
                                        <v-list-tile-avatar>
                                            <v-layout row>
                                                <v-flex xs6 sm6 md6 lg5 xl4>
                                                    <v-tooltip top>
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn color="grey lighten-2" small fab v-on="on">
                                                                <v-icon>person</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>{{task.assignedTo}}</span>
                                                    </v-tooltip>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content >
                                            <v-list-tile-title>
                                                <v-layout row>
                                                    <v-flex xs6 sm6 md6 lg3 xl4>
                                                        <v-menu :close-on-content-click="false" :nudge-width="100" offset-y max-width="300">
                                                            <template v-slot:activator="{ on }">
                                                                <a color="indigo" v-on="on" style="margin-top: 16px;">
                                                                    {{getNameFromEmail(task.assignedTo)}}
                                                                </a>
                                                            </template>
                                                            <v-card>
                                                                <v-card-title>
                                                                    <v-layout row wrap>
                                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                                            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchEmail" ></v-text-field>
                                                                        </v-flex>
                                                                        <br>
                                                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                                                            <v-select :items="searchedEmail" item-value="email" item-text="displayText" v-model="task.assignedTo" @change="updateTask(task.taskId, 'assignedTo', task.assignedTo)"></v-select>
                                                                        </v-flex>
                                                                    </v-layout>
                                                                </v-card-title>
                                                            </v-card>
                                                        </v-menu>
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg4 xl4 class="pl-3">
                                                        <v-menu v-model="task.menu1" :close-on-content-click="false" :nudge-right="40" lazy
                                                            transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                            <template v-slot:activator="{ on }">
                                                                <a color="indigo" v-on="on" style="margin-top: 16px;">
                                                                    {{task.dueDateDate}}
                                                                </a>
                                                            </template>
                                                            <v-date-picker v-model="task.dueDateDate" no-title @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"></v-date-picker>
                                                        </v-menu>
                                                        
                                                        <!-- <v-select
                                                            style=" width: 20px;"
                                                            v-model="task.dueDateTime"
                                                            :items="timeToChoose"
                                                            @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"
                                                        ></v-select> -->
                                                    </v-flex>
                                                    <v-flex xs3 sm3 md3 lg5 xl4>
                                                        <v-menu :close-on-content-click="false" :nudge-right="40" lazy
                                                            transition="scale-transition" offset-y full-width>
                                                            <template v-slot:activator="{ on }">
                                                                <a color="indigo" v-on="on">
                                                                    {{task.dueDateTime}}
                                                                </a>
                                                            </template>
                                                            <v-select
                                                                style=" width: 100px; padding: 0px 10px;"
                                                                v-model="task.dueDateTime"
                                                                :items="timeToChoose"
                                                                @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"
                                                            ></v-select>
                                                        </v-menu>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <br>
                                    <br>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-layout row style="width: 100%">
                                                <v-flex xs12 sm12 md12 lg12 xl12 style="width: 100%">
                                                    <br>
                                                    <v-text-field
                                                        v-model="task.note"
                                                        solo
                                                        flat
                                                        @change="updateTask(task.taskId, 'note', task.note)"
                                                        style="width: 100%"
                                                    ></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile class="mt-3">
                                        <v-list-tile-content>
                                            <v-list-tile-title>
                                                <v-layout row>
                                                    <v-flex xs12 sm12 md12 lg10 xl8>
                                                        <v-layout row>
                                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                                <span>Type</span>
                                                            </v-flex>
                                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                                <span>Reminder</span>
                                                            </v-flex>
                                                            <v-flex xs2 sm2 md2 lg2 xl2 v-if="task.emailReminder != null">
                                                                <span>Time</span>
                                                            </v-flex>
                                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                                <span>Queue</span>
                                                            </v-flex>
                                                            <v-flex xs4 sm4 md4 lg4 xl4>
                                                                <span>Created by</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title>
                                                <v-layout row>
                                                    <v-flex xs12 sm12 md12 lg10 xl8>
                                                        <v-layout row>
                                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                                <span>
                                                                    <v-menu :close-on-content-click="false" :nudge-width="75" top offset-y>
                                                                        <template v-slot:activator="{ on }">
                                                                            <a color="indigo" v-on="on">
                                                                                {{task.type}}
                                                                            </a>
                                                                        </template>
                                                                        <!-- <v-select :items="['To-do', 'Email', 'Call']" v-model="task.type" 
                                                                        style="backgroundColor: white; padding: 20px;" @change="updateTask(task.taskId, 'type', task.type)"></v-select> -->
                                                                        <v-list-tile @click="changeType(task.taskId, task.type, 'To-do')" style="backgroundColor: white;">
                                                                            <v-list-tile-title>To-do</v-list-tile-title>
                                                                        </v-list-tile>
                                                                        <v-list-tile @click="changeType(task.taskId, task.type, 'Email')" style="backgroundColor: white;">
                                                                            <v-list-tile-title>Email</v-list-tile-title>
                                                                        </v-list-tile>
                                                                        <v-list-tile @click="changeType(task.taskId, task.type, 'Call')" style="backgroundColor: white;">
                                                                            <v-list-tile-title>Call</v-list-tile-title>
                                                                        </v-list-tile>
                                                                    </v-menu>
                                                                </span>
                                                            </v-flex>
                                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                                <v-layout row wrap>
                                                                    <v-flex xs12 sm12 md12 lg12 xl12>
                                                                        <v-menu :close-on-content-click="false" :nudge-width="200" top offset-y>
                                                                            <template v-slot:activator="{ on }">
                                                                                <a color="indigo" v-on="on" v-if="task.emailReminder == null">
                                                                                    No reminder
                                                                                </a>
                                                                                <a color="indigo" v-on="on" v-else>
                                                                                    {{task.emailReminderDate}}
                                                                                </a>
                                                                            </template>
                                                                            <v-list>
                                                                                <v-menu :close-on-content-click="false" :nudge-width="200" offset-y v-model="task.date2" full-width max-width="290px" min-width="290px">
                                                                                    <template v-slot:activator="{ on }">
                                                                                        <v-list-tile v-on="on">
                                                                                            <v-list-tile-title>Custom Date</v-list-tile-title>
                                                                                        </v-list-tile>
                                                                                    </template>
                                                                                    <v-date-picker v-model="task.emailReminderDate" no-title @change="updateTask(task.taskId, 'emailReminder', task.emailReminderDate + 'T' + task.emailReminderTime + ':00')" ></v-date-picker>
                                                                                </v-menu>
                                                                                
                                                                                <v-list-tile @click="updateTask(task.taskId, 'emailReminder', '')">
                                                                                    <v-list-tile-title >No reminder</v-list-tile-title>
                                                                                </v-list-tile>
                                                                            </v-list>
                                                                        </v-menu>
                                                                    </v-flex>
                                                                    <!-- <v-flex xs12 sm12 md12 lg12 xl12>
                                                                        <v-select
                                                                            v-if="task.emailReminder != null"
                                                                            v-model="task.emailReminderTime"
                                                                            :items="timeToChoose"
                                                                            label="Time"
                                                                            @change="updateTask(task.taskId, 'dueDate', task.dueDateDate + 'T' + task.dueDateTime + ':00')"
                                                                        ></v-select>
                                                                    </v-flex> -->
                                                                </v-layout>
                                                            </v-flex>
                                                            <v-flex xs2 sm2 md2 lg2 xl2 v-if="task.emailReminder != null">
                                                                <span>
                                                                    <v-menu :close-on-content-click="false" offset-y>
                                                                        <template v-slot:activator="{ on }">
                                                                            <a color="indigo" v-on="on" >
                                                                                {{task.emailReminderTime}}
                                                                            </a>
                                                                        </template>
                                                                        <v-select
                                                                            style="backgroundColor: white; padding: 0px 10px; width: 100px;"
                                                                            v-model="task.emailReminderTime"
                                                                            :items="timeToChoose"
                                                                            @change="updateTask(task.taskId, 'emailReminder', task.emailReminderDate + 'T' + task.emailReminderTime + ':00')"
                                                                        ></v-select>
                                                                    </v-menu>
                                                                </span>
                                                            </v-flex>
                                                            <v-flex xs2 sm2 md2 lg2 xl2>
                                                                <span>None</span>
                                                            </v-flex>
                                                            <v-flex xs4 sm4 md4 lg4 xl4>
                                                                <span>{{task.createdByUser}}</span>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-list-group>
                        </v-flex>
                    </v-layout>
                </v-card>
            </template>
            
        </v-flex>
    </v-layout>
</template>
<script>
    import moment from 'moment'
    import taskService from '../../../services/task.service'
    import { eventBus } from '../../../eventBus';
    export default {
        props: {
            idAccount: {
                type: String,
                default: null,
            },
            idContact: {
                type: String,
                default: null,
            }
        },
        data(){
            return {
                tasks: [],
                allEmail: [],
                searchedEmail: [],
                progress: true,
                timeToChoose: [
                    '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', 
                    '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45',
                    '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45',
                    '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45',
                    '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
                    '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
                    '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45',
                    '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
                    '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45',
                    '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45',
                    '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45',
                    '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45',],
                searchEmail: ''
            }
        },
        watch: {
            searchEmail(){
                this.searchedEmail = [];
                this.allEmail.filter(e => {
                    if(e.name.toLowerCase().includes(this.searchEmail.toLowerCase())){
                        this.searchedEmail.push(e);
                    }
                })
            }
        },
        methods: {
            parseDate(date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            checkOverdue(date){
                return (!moment(date).isAfter(moment()))
            },
            coverTime(time){
                if (_.isNull(time)) return '';
                return moment(time).format('DD/MM/YYYY')
            },
            coverTimeTooltip(time){
                if (_.isNull(time)) return '';
                return moment(time).format('DD/MM/YYYY HH:mm:ss')
            },
            coverTimeHourOnly(time){
                if (_.isNull(time)) return '';
                return moment(time).format('HH:mm')
            },
            getTask(){
                taskService.getTask(this.idAccount, this.idContact).then(result => {
                    for(let i = 0; i < result.response.length; i++){
                        result.response[i].assignedToUser = this.getNameFromEmail(result.response[i].assignedTo);
                        result.response[i].createdByUser = this.getNameFromEmail(result.response[i].createdBy);
                        result.response[i].menu1 = false;
                        result.response[i].time1 = false;
                        result.response[i].dueDateDate = result.response[i].dueDate.substring(0, 10);
                        result.response[i].dueDateTime = result.response[i].dueDate.substring(11, 16)
                        result.response[i].menu2 = false;
                        result.response[i].time2 = false;
                        if(result.response[i].emailReminder != null){
                            result.response[i].emailReminderDate = result.response[i].emailReminder.substring(0, 10);
                            result.response[i].emailReminderTime = result.response[i].emailReminder.substring(11, 16);
                        }
                        else {
                            result.response[i].emailReminderDate = '';
                            result.response[i].emailReminderTime = '08:00';
                            result.response[i].emailReminderChoice = 'No reminder'
                        }
                        
                    }
                    this.tasks = result.response.reverse();
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.progress = false;
                })
            },
            getAllEmail(){
                // this.progress = true;
                this.allEmail = [];
                taskService.getAllEmail(this.idAccount).then(result => {
                    result.response.filter(e => {
                        e.displayText = e.name + ' (' + e.email + ')'
                        this.allEmail.push(e);
                        this.searchedEmail.push(e);
                    });
                    this.getTask();
                }).catch(error => {
                    console.log(error);
                    this.progress = false;
                });
                
            },
            getNameFromEmail(email){
                let result = '';
                for(let i = 0; i< this.allEmail.length;i++){
                    if(this.allEmail[i].email === email){
                        result = this.allEmail[i].name;
                    }
                }
                return result;
            },
            updateTask(taskId, property, value){
                let body = {
                    "property": property,
                    "value": value,
                }
                taskService.updateTask(this.idAccount, this.idContact, taskId, body).then(result => {
                    console.log(result);
                    eventBus.updateTaskList();
                })
            },
            changeType(taskId, type, item){
                type = item;
                this.updateTask(taskId, 'type', type);
            },
            updateTaskList(){
                let tempArray = [];
                taskService.getTask(this.idAccount, this.idContact).then(result => {
                    for(let i = 0; i < result.response.length; i++){
                        result.response[i].assignedToUser = this.getNameFromEmail(result.response[i].assignedTo);
                        result.response[i].createdByUser = this.getNameFromEmail(result.response[i].createdBy);
                        result.response[i].menu1 = false;
                        result.response[i].time1 = false;
                        result.response[i].dueDateDate = result.response[i].dueDate.substring(0, 10);
                        result.response[i].dueDateTime = result.response[i].dueDate.substring(11, 16);
                        result.response[i].ref = result.response[i].taskId;
                        result.response[i].menu2 = false;
                        result.response[i].time2 = false;
                        if(result.response[i].emailReminder != null){
                            result.response[i].emailReminderDate = result.response[i].emailReminder.substring(0, 10);
                            result.response[i].emailReminderTime = result.response[i].emailReminder.substring(11, 16);
                        }
                        else {
                            result.response[i].emailReminderDate = '';
                            result.response[i].emailReminderTime = '08:00';
                            result.response[i].emailReminderChoice = 'No reminder'
                        }
                    }
                    tempArray = result.response.reverse();
                    for(let i = 0; i<tempArray.length; i++){
                        if(tempArray[i] != this.tasks[i]){
                            this.tasks[i] = tempArray[i];
                        }
                    }
                    this.tasks = [...this.tasks];
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.progress = false;
                })
            }

        },
        created(){
            eventBus.$on('updateTaskList', () => {
                this.updateTaskList();
            })
            this.getAllEmail();
        }
    }
</script>
