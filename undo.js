class UndoStack{
	constructor(){
		this.stack = [];
		this.pointer = this.stack.length;
	}



	record(params){
		if(this.pointer == this.stack.length){
			this.stack.push(params);
			this.pointer += 1;
		}
		else{
			this.stack = this.stack.slice(0,this.pointer);
			this.record(params);
		}
	}

	execute(params){
		this.record(params);
		return params.redo();
	}

	undo(){
		if(this.pointer == 0)
			return null;

		this.onStackUpdate();

		var action = this.stack[this.pointer-1];
		this.pointer -= 1;

		return 	action.undo();
	}

	redo(){
		if(this.pointer == this.stack.length)
			return null;

		this.onStackUpdate();

		var action = this.stack[this.pointer];
		this.pointer+=1;
		return action.redo();

	}

	onStackUpdate(){
		
	}
}