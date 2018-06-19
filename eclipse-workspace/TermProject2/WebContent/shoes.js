
function shoes_img(shoes_name_string) { // 이미지 출력 함수. 이미지 파일 확장자가 다를 수 있으므로.
	var obj = {};
	switch(shoes_name_string){
	case "p-31 white":
		obj.src = "./shoesimage/p-31 white.jpg";
		obj.alt = "p-31 white";
		return obj;
	case "p-31 black":
		obj.src = "./shoesimage/p-31 black.jpg";
		obj.alt = "p-31 black";
		return obj;
		}
} 

function shoes_size_option(shoes_name_string, shoes_order) {
	switch(shoes_name_string){
	case "p-31 white":
		size_220_to_280_5unit(shoes_order);
		break;
	case "p-31 black":
		size_220_to_280_5unit(shoes_order);
		break;
	}
}

function shoes_maker_homepage_link(shoes_name_string) {
	
}

function delete_option(shoes_order) {
	var name = "#size" + shoes_order + "_first";
	$(name).nextAll().remove();
}

function size_220_to_280_5unit(shoes_order) {
	delete_option(shoes_order);
	var name = "#shoes" + shoes_order + "_size";
	for(var i = 220; i <= 280; i = i + 5) {
		console.log(i);
		 $(name).append($('<option>', {
			 text: i,
			 value: i
		 }));	 
	}
}