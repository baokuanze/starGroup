/**
 * Created by shaoruiguo on 15/6/13.
 */
var mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp'};
var selectedHandler;
var bytesHandler;
var thisRef;
var MAX_WIDTH=750;
var MAX_HEIGHT = 1334;
var SMALL_HEIGHT=200;

function selectImage(selectedFunc,thisValue,small) {
	if(small)
		SMALL_HEIGHT=small;
	else{
		SMALL_HEIGHT=0;
	}
    selectedHandler = selectedFunc;
    thisRef = thisValue;
    var fileInput = document.getElementById("fileInput");
    if(fileInput==null){
        fileInput = document.createElement("input");
        fileInput.id = "fileInput";
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.height = "0px";
        fileInput.style.display = "block";
        fileInput.style.overflow = "hidden";
        document.body.insertBefore(fileInput,document.body.firstChild);
        fileInput.addEventListener('change', tmpSelectFile, false);
    }
    setTimeout(function(){fileInput.click()},100);
}
function selectImageUpload(selectedFunc,thisValue) {
    selectedHandler = selectedFunc;
    thisRef = thisValue;
    var fileInput = document.getElementById("fileInput");
    if(fileInput==null){
        fileInput = document.createElement("input");
        fileInput.id = "fileInput";
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.height = "0px";
        fileInput.style.display = "block";
        fileInput.style.overflow = "hidden";
        document.body.insertBefore(fileInput,document.body.firstChild);
        fileInput.addEventListener('change', tmpSelectFileUpload, false);
    }
    setTimeout(function(){fileInput.click()},100);
}
function tmpSelectFile(evt) {
    //console.log("image selected...");
    var file = evt.target.files[0];
    var type = file.type;
    if (!type) {
        type = mime[file.name.match(/\.([^\.]+)$/i)[1]];
    }
    var ret = myCreateObjectURL(file);
    tmpCreateImage && tmpCreateImage(ret,file);
    var fileInput = document.getElementById("fileInput");
    fileInput.value="";
}
function tmpSelectFileUpload(evt) {
    //console.log("image selected...");
    var file = evt.target.files[0];
    var type = file.type;
    if (!type) {
        type = mime[file.name.match(/\.([^\.]+)$/i)[1]];
    }
    var ret = myCreateObjectURL(file);
    tmpCreateImageUpload && tmpCreateImageUpload(ret,file);
    var fileInput = document.getElementById("fileInput");
    fileInput.value="";
}
function tmpCreateImage(uri,file) {
    var image = new Image();
    image.onload = function(){
        var canvas = document.createElement("canvas");
        if(!isWeixin() && image.height > MAX_HEIGHT) {
            //宽度等比例缩放
            //image.width *= MAX_HEIGHT / image.height;
            //image.height = MAX_HEIGHT;
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            var smallURL = canvas.toDataURL("image/png");
        } else {
            smallURL = uri;
        }
		var smallURL1="";
		if(SMALL_HEIGHT>0){
			
			image.width *= SMALL_HEIGHT / image.height;
            image.height = SMALL_HEIGHT;
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            smallURL1 = canvas.toDataURL("image/png");
		}
        image.width = image.height = 1;
		if(smallURL1){
			selectedHandler & selectedHandler(thisRef,smallURL,file,smallURL1);
		}else{
			selectedHandler & selectedHandler(thisRef,smallURL,file);
		}
        
    }
    image.src = uri;
    image.style.visibility = "hidden";
    document.body.appendChild(image);
}
function tmpCreateImageUpload(uri,file) {
    var image = new Image();
    image.onload = function(){
        var canvas = document.createElement("canvas");
		var k='';
		 var w=image.width;var h=image.height;
		if(image.width<MAX_WIDTH&&image.height<MAX_HEIGHT){
			if(image.width/MAX_WIDTH<image.height/MAX_HEIGHT){
				k='width';
			}else{
				k='height';
			}
		}else if(image.width<MAX_WIDTH){
			k='width';
		}else if(image.height<MAX_HEIGHT){
			k='height';
		}
		var smallURL='';
		switch(k){
			case 'width':
				image.height *= MAX_WIDTH/image.width;
				image.width = MAX_WIDTH;
				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				canvas.width = image.width;
				canvas.height = image.height;
				ctx.drawImage(image, 0, 0, image.width, image.height);
				smallURL = canvas.toDataURL("image/png");
			break;
			case 'height':
				image.width *= MAX_HEIGHT / image.height;
				image.height = MAX_HEIGHT;
				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				canvas.width = image.width;
				canvas.height = image.height;
				ctx.drawImage(image, 0, 0, image.width, image.height);
				smallURL = canvas.toDataURL("image/png");
			break;
			case '':
				 smallURL = uri;
			break;
		}
       
        image.width = image.height = 1;
		selectedHandler & selectedHandler(thisRef,smallURL,file,k,image,w,h);
        
    }
    image.src = uri;
    image.style.visibility = "hidden";
    document.body.appendChild(image);
}
function setSmallImg(selectedHandler,thisValue,image,w,h,imgW,imgH,sx,sy,swidth,sheight,x,y,width,height){
	var k='';
	image.width=w;image.height=h;
	if(image.width<MAX_WIDTH&&image.height<MAX_HEIGHT){
		if(image.width/MAX_WIDTH<image.height/MAX_HEIGHT){
			k='width';
		}else{
			k='height';
		}
	}else if(image.width<MAX_WIDTH){
		k='width';
	}else if(image.height<MAX_HEIGHT){
		k='height';
	}
	var smallURL='';
	switch(k){
		case 'width':
			image.height *= imgW/image.width;
			image.width = imgW;
		break;
		case 'height':
			image.width *= imgH / image.height;
			image.height = imgH;
		break;
		case '':
			image.height *= imgW/image.width;
			image.width = imgW;
		break;
	}
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = 750;
	canvas.height = 1334;
	ctx.drawImage(image, sx, sy,swidth,sheight,x,y,750,1334);
	var largeURL= canvas.toDataURL("image/png");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = 224;
	canvas.height = 385;
	ctx.drawImage(image, sx, sy,swidth,sheight,x,y,224,385);
	var smallURL= canvas.toDataURL("image/png");
	image.width = image.height = 1;
	selectedHandler & selectedHandler(thisValue,largeURL,smallURL);
}
function myCreateObjectURL(blob){
    if(window.URL != undefined)
        return window['URL']['createObjectURL'](blob);
    else
        return window['webkitURL']['createObjectURL'](blob);
}
function myResolveObjectURL(blob){
    if(window.URL != undefined)
        window['URL']['revokeObjectURL'](blob);
    else
        window['webkitURL']['revokeObjectURL'](blob);
}

function getImageData(file,bytesFunc,thisValue) {
    bytesHandler = bytesFunc;
    thisRef = thisValue;
    try{var reader = new FileReader();}
    catch(err) {console.log("no support FileReader")}
    function tmpLoad() {
        bytesHandler && bytesHandler(thisRef,this.result);
    }
    reader.onload = tmpLoad;
    reader.readAsArrayBuffer(file);
}
function isWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
/**
 * Created by shaoruiguo on 15/10/16.
 */
function selectImageWX(selectedFunc,thisValue) {
    selectedHandler = selectedFunc;
    thisRef = thisValue;
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            //alert(localIds[0]);
            tmpCreateImage(localIds[0]);
        }
    });
}
