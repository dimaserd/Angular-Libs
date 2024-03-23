import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OpenApiMethodDocumentation } from '../../models';
import { DefaultJsonGenerator } from '../../services';

@Component({
  selector: 'croco-js-worker-method',
  templateUrl: './js-worker-method.component.html',
  styleUrls: ['./js-worker-method.component.css']
})
export class JsWorkerMethodComponent implements OnInit {

  @Input() workerName: string;
  @Input() method: OpenApiMethodDocumentation;
  @Input() remoteName: string = null; 
  @Output() onGetScript = new EventEmitter<string>();

  panelOpenState = false;
  constructor() {
  }
  
  ngOnInit() {
  }

  getScript(): void {

    var script = "";

    var paramsCall = "";

    if(this.method.parameters != null){

      paramsCall += ", ";

      for (let index = 0; index < this.method.parameters.length; index++) {
        let paramName = `param${index}`;
        script += `var ${paramName} = ${new DefaultJsonGenerator(this.method.parameters[index]).getExampleJson()};\n`;
        
        let comma = index < this.method.parameters.length - 1 ? ', ' : '';
        paramsCall += `${paramName}${comma}`;
      }
    }
    
    var apiCallStr = "";

    if(!!this.remoteName){
      apiCallStr = `api.CallRemoteWorkerMethod("${this.remoteName}", "${this.workerName}", "${this.method.methodName}"${paramsCall});\n`;
    }
    else{
      apiCallStr = `api.Call("${this.workerName}", "${this.method.methodName}"${paramsCall});\n`;
    }
    
    if(this.method.response != null){
      script += `var result = ${apiCallStr}`;
      script += `console.log(result);\n`;
    }
    else{
      script += apiCallStr;
    }

    this.onGetScript.emit(script);
  }
}