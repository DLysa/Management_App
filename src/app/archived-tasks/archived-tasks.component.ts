import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../services/sevices/task.service";
import {DialogRef} from "@angular/cdk/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Store} from "../store/store";

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.css']
})
export class ArchivedTasksComponent implements OnInit{
  dataSource:Task[] = [];
  displayedColumns: string[] = ['Title', 'Status', 'Inserted user', 'Working', 'See details', 'Restore',  'Delete'];
  archivedTasks:Task[];
  roles:string

  constructor(private taskService: TaskService,
              private dialogRef:MatDialogRef<TaskDetailsFormComponent>,
              private dialog: MatDialog,
              private store:Store) {}

  ngOnInit(): void {
    this.archivedTasks=[];
    this.taskService.getTasks().subscribe((data)=>{
      const archivedData = data.filter(task => task.archive);
      this.archivedTasks = archivedData.map(task => ({
        ...task,//todo wszedzie tak zrobić
        archive: false

      }));
      this.dataSource=this.archivedTasks;
      console.log(this.dataSource)
    })

    let convert:any=this.store.currentUser.roles[0];
    this.roles=convert.authority.split('ROLE_')[1];
    if (this.roles==="TESTER "){
      this.displayedColumns = this.displayedColumns.slice(0, this.displayedColumns.length - 2);
      console.log(this.displayedColumns)
    }

  }
  seeDetails(selectedTask:Task) {
    this.store.selectedTask = selectedTask;
    this.dialog.open(TaskDetailsFormComponent)
    this.store.selectedTask = selectedTask
  }

  deleteTask(taskToDelete:Task):void{
    this.taskService.deleteTask(taskToDelete.id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.dialogRef.close();
  }

  unArchiveTask(selectedTask:Task): void {

    this.taskService.updateTask({
      ...selectedTask,
      archive: false
    })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  isUserManager(): boolean {
    return this.store.currentUser && this.roles === 'MANAGER ';
  }

  close() {
    this.dialogRef.close();
  }

}
