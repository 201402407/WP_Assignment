// 신발의 img를 가져오는 함수.
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
	case "adidas shoes1":
		obj.src = "./shoesimage/adidas shoes1.jpg";
		obj.alt = "adidas shoes1";
		return obj;
	case "reebok shoes1":
		obj.src = "./shoesimage/reebok shoes1.jpg";
		obj.alt = "reebok shoes1";
		return obj;
	case "nike shoes1":
		obj.src = "./shoesimage/nike shoes1.jpg";
		obj.alt = "nike shoes1";
		return obj;
	}
	
} 
// 각각 신발 별 size option 추가.
function shoes_size_option(shoes_name_string, shoes_order) {
	switch(shoes_name_string){
	case "p-31 white":
		size_220_to_280_5unit(shoes_order);
		break;
	case "p-31 black":
		size_220_to_280_5unit(shoes_order);
		break;
	case "adidas shoes1":
		size_220_to_280_5unit(shoes_order);
		break;
	case "reebok shoes1":
		size_220_to_280_10unit(shoes_order);
		break;
	case "nike shoes1":
		size_220_to_280_10unit(shoes_order);
		break;
}
}
// 다른 신발 클릭 시 size가 변경될 수 있으므로
function delete_option(shoes_order) {
	var name = "#size" + shoes_order + "_first";
	$(name).nextAll().remove();
}

// 여기서부터는 신발 최소-최대 사이즈가 다르므로 각각의 경우에 대한 사이즈 option 추가 함수. 
function size_220_to_280_5unit(shoes_order) {
	delete_option(shoes_order);
	var name = "#shoes" + shoes_order + "_size";
	for(var i = 220; i <= 280; i = i + 5) {
		
		 $(name).append($('<option>', {
			 text: i,
			 value: i,
			 id: i,
		 }));	 
	}
}
function size_200_to_280_5unit(shoes_order) {
	delete_option(shoes_order);
	var name = "#shoes" + shoes_order + "_size";
	for(var i = 200; i <= 280; i = i + 5) {
		
		 $(name).append($('<option>', {
			 text: i,
			 value: i,
			 id: i,
		 }));	 
	}
}
function size_200_to_280_10unit(shoes_order) {
	delete_option(shoes_order);
	var name = "#shoes" + shoes_order + "_size";
	for(var i = 200; i <= 280; i = i + 10) {
		
		 $(name).append($('<option>', {
			 text: i,
			 value: i,
			 id: i,
		 }));	 
	}
}
function size_220_to_280_10unit(shoes_order) {
	delete_option(shoes_order);
	var name = "#shoes" + shoes_order + "_size";
	for(var i = 220; i <= 280; i = i + 10) {
		
		 $(name).append($('<option>', {
			 text: i,
			 value: i,
			 id: i,
		 }));	 
	}
}
function size_210_to_280_5unit(shoes_order) {
	delete_option(shoes_order);
	var name = "#shoes" + shoes_order + "_size";
	for(var i = 210; i <= 280; i = i + 5) {
		
		 $(name).append($('<option>', {
			 text: i,
			 value: i,
			 id: i,
		 }));	 
	}
}
function size_210_to_290_5unit(shoes_order) {
	delete_option(shoes_order);
	var name = "#shoes" + shoes_order + "_size";
	for(var i = 210; i <= 290; i = i + 5) {
		
		 $(name).append($('<option>', {
			 text: i,
			 value: i,
			 id: i,
		 }));	 
	}
}