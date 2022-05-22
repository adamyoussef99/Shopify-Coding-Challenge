function deleteProduct(){
	try {
		req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if(this.readyState==4 && this.status==200){
				alert("Product deleted successfully.");
				window.location.href = "http://localhost:3000/products";
			} else if(this.readyState== 4 && this.status>400) {
				alert("Oh no! Product failed to delete successfully. Try again");
			}
		}
		let id = document.getElementById("id").value;
		debugger
		req.open("DELETE", `http://localhost:3000/products/${id}`);
		req.send();
	} catch (error) {
		console.log('Unable to delete product')
		console.error(error)
	}

}

function undoDelete(){
	try {
		req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if(this.readyState==4 && this.status==200){
				alert("Product restored successfully.");
				window.location.href = "http://localhost:3000/products";
			} else if(this.readyState== 4 && this.status>400) {
				alert("Oh no! Delete undo failed. Please try again.");
			}
		}
		let id = document.getElementById("id").value;
		req.open("PUT", `http://localhost:3000/products/${id}`);	
		req.send();
	} catch (error) {
		console.log(`Unable to revert deletion of product${id}`)
		console.error(error)
	}

}