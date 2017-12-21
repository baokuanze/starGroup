/**
*
* @author 
*
*/
class Tools
{

    private static _intance: Tools = new Tools();
    private iphone: number = 0;
    public constructor()
    {
    }

    public static getInstance(): Tools
    {
        return this._intance;
    }
    public resetSc(arr: any[][]): void {//a:any,isW:boolean=false,isH:boolean=false
        for(var i in arr) {
            var array: Array<any> = arr[i];
            var a: any = array[0];
            var isW: boolean = false;
            var isH: boolean = false;
            if(array.length > 1) { isW = array[1] };
            if(array.length > 2) { isH = array[2] };
            a.y = a.y * GameApp.sc;
            if(isW)
                a.width = a.width * GameApp.sc;
            if(isH)
                a.height = a.height * GameApp.sc;
        }
    }
    public resetScGroup(g: eui.Group): void {
        var arr: any[] = [];
        for(var i: number = 0;i < g.numElements;i++) {
            var a: egret.DisplayObject = g.getElementAt(i);
            arr.push([a,true,true]);
        }
        this.resetSc(arr);
    }
      /**
    * 返回时间搓时间
    * @param num
    * @returns {*}
    */
    public getTime(now: Date):string{   
        
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + "-" + month + "-" + date;
    }
    
    public getHour(now: number): string {
        var data = new Date(now);
        var hour = data.getHours();
        var scend = data.getMinutes();
        if(scend<9){
            return hour + ":" + scend + "0";
        }else{
            return hour + ":" + scend + "";
        }
    }
    public getMonth(now: number):string{
        var data = new Date(now);
        var month = data.getMonth()+1;
        var day=data.getDate();
        return month+"月"+day+"日";
    }
    
    public getTime3(now: Date): string {
        var year = now.getFullYear();
        var month = now.getMonth();
        
        if(month==0){
            year+=1
            return year + "年" + 12 + "月";
        }else{
            return year + "年" + month + "月";
        }
    }
    
    public getTime4(now: Date ,str:number ): string {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var lastMonth = now.getMonth() + 1;
        var data = now.getDate();

        return year + "年第" + str + "期(" + lastMonth + "." + "1" + "-" + month + "." + data +")";
    }
    
    public getTime6(now: number): string {
        var tempMonth:string;
        var tempDay: string;
        var tempMonth1:string;
        var tempDay1:string;
        
        var data = new Date(now-1*24*3600*1000);
        var year = data.getFullYear();
        var month = data.getMonth() + 1;
        var day = data.getDate();
        
        var time2 = now - 7*24*3600*1000;
        var data2 = new Date(time2);
        var month2 = data2.getMonth() + 1;
        var day2 = data2.getDate();
        if(month<=9){
            tempMonth = "0" + month;
        }else{
            tempMonth = month + "";
        }
        
        if(day <= 9) {
            tempDay = "0" + day;
        } else {
            tempDay = day + "";
        }
        
        if(month2 <= 9) {
            tempMonth1 = "0" + month2;
        } else {
            tempMonth1 = month2 + "";
        }

        if(day2 <= 9) {
            tempDay1 = "0" + day2;
        } else {
            tempDay1 = day2 + "";
        }
        
        return year + "." + tempMonth1 + "." + tempDay1 + "-" + tempMonth + "." + tempDay;
    }
    
    
    public getTime2(now: Date): string {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + "." + month + "." + date;
    }
    
    public getTime5(now: Date): string {
        var hourse = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return hourse + ":" + minute + ":" + second;
    }
    
    
    /**
    * 返回万进制数字缩写
    * @param num
    * @returns {*}
    */
    public shortNumberTT = function ( num )
    {
        var n = parseInt( num, 10 ), r;
        if ( n >= 10000 )
        {
            r = Math.floor( n / 10000 ) + "万";
        } else r = n;
        return r;
    };
        
    /**
    * 获取URL中的参数
    * @param name
    * @returns {*}
    */
    public getUrlAttribute( name ): string
    {
        var p: string = location.search.substring( 1 );
        var i: number = p.indexOf( name + "=" );
        if ( i > -1 )
        {
            var t: string = p.substring( i );
            return t.substring(( name + "=" ).length, t.indexOf( "&" ) > -1 ? t.indexOf( "&" ) : t.length );
        } else
        {
            return null;
        }
    }
    public isIphone():boolean{
        if(this.iphone == 0) { 
            var s: string = navigator.userAgent.toLowerCase();
//            console.log(s,"是什么设备");
            if(s.indexOf("iPhone") > -1 || s.indexOf("iPad") > -1 || s.indexOf("iphone") > -1) {
                this.iphone = 1;
                return true;
            }else{
                this.iphone = 2;
                return false;
            }
        }else{
            if(this.iphone==1){
                return true;
            }else{
                return false;
            }
        }
//        return false;
    }
//    /**获取url**/
//    public getUrlParam(name):string
//    {
//        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//        var r = location.search.substr(1).match(reg);  //匹配目标参数
//        if (r!=null) return unescape(r[2]); return null; //返回参数值
//    }
    //格式化时间
    public formatTime( time )
    {  
        var hour = this.setTimeStyle( Math.floor( time / 3600 ) );
        var min = this.setTimeStyle( Math.floor(( time - parseInt( hour ) * 3600 ) / 60 ) );
        var sec = this.setTimeStyle( time - parseInt( hour ) * 3600- parseInt( min ) * 60 );
        return hour + ":" + min + ":" + sec;
    }
    public formatTime2(mss:number) {
        var hour: number = this.setTimeStyle(parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)+""));
        var min: number = this.setTimeStyle(parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)+""));
        var sec: number = this.setTimeStyle(parseInt((mss % (1000 * 60)) / 1000+""));
        return hour + ":" + min + ":" + sec;
    }
    public formatTime22(mss:number):string{
        var date: Date = new Date(mss); 
        if(date.getDate()){
            var num = date.getDate();
            var hours = date.getHours() + num*24;
            return hours + ":" + date.getMinutes() + ":" + date.getSeconds();
        }else{
            return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
    }
    public formatTime4(mss: number) {
        var min: number = this.setTimeStyle(parseInt((mss % (1000 * 60 * 60)) / (1000 * 60) + ""));
        var sec: number = this.setTimeStyle(parseInt((mss % (1000 * 60)) / 1000 + ""));
        return  min + ":" + sec;
    }
    
    public formatTime5(date: Date):string {
        var minute = date.getMinutes();
        var second = date.getSeconds(); 
        return minute + ":" + second
    }
    
    

    
    public formatTime3(mss: number) {
        var date:Date=new Date(mss);
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    }
    public formatTime1(time:number):string{
        if(time>=3600){
            return Math.floor(time/3600)+"小时";
        }else if(time>=60){
            return Math.floor(time/60)+"分";
        }else{
            return time + "秒";
        }
//        return "0秒";
    }
    //将数字格式化成两位数如0=>00
    private setTimeStyle( num )
    {  
        
        if ( num > 0 && num < 10 )
        {
            return "0" + num.toString();
        } else if ( num == 0 )
        {
            return "00";
        } else
        {
            return num.toString();
        }
    }
    //判断是不是空对象
    public isObject(obj: Object): boolean {
        var ret: boolean = false;
        if(obj) {
            for(var i in obj) {
                ret = true;
                break;
            }
            return ret;
        } else
            return false;
    }
    //控件舞台坐标  
    public getPoint(UI):egret.Point
    { 
        var point = UI.localToGlobal();
        return point;
    }
    /**得到两个数字之间的随即书**/
    public getRandomByNum(r1:number,r2:number):number{
        if(r1==r2)return r1;
        var ret:number=r1;
        var cha:number=Math.abs(r2-r1);
        var min:number=r1>r2?r2:r1;
        ret=Math.random()*cha+min;
        return ret;
    }
    //得到圆形图片
    public getCricle(x: number,y: number,r: number,color:number,group: egret.DisplayObjectContainer): egret.Shape {
        var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(color);
        circle.graphics.drawCircle(0,0,r / 2);
        circle.graphics.endFill();
        circle.x = x; circle.y = y;
        group.addChild(circle);
        return circle;
    }
    //得到圆形图片
    public getCricleMask(x: number,y: number,r: number,group:egret.DisplayObjectContainer): egret.Shape {
        var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0xffffff);
        circle.graphics.drawCircle(0,0,r / 2);
        circle.graphics.endFill();
        circle.x=x;circle.y=y;
        group.addChild(circle);
        return circle;
    }
    public getRoundRShape(x: number,y: number,w: number,h: number,wr: number,hr: number,color: number,alpha: number = 1,sp: egret.Shape = null): egret.Shape {
        if(sp) {
            sp.graphics.clear();
            sp.graphics.beginFill(color,alpha);
            sp.graphics.drawRoundRect(x,y,w,h,wr,hr);
            sp.graphics.endFill();
            return sp;
        } else{
            var s: egret.Shape = new egret.Shape();
            s.graphics.beginFill(color,alpha);
            s.graphics.drawRoundRect(x,y,w,h,wr,hr);
            s.graphics.endFill();
            return s;
        }
    }
    public getShape(spp: egret.Shape,w: number,h: number,x: number,y: number,wr: number,hr: number,linestyle: number = -1,fill: number = -1): egret.Shape {
        var sp: egret.Shape;
        if(spp) {
            spp.graphics.clear();
            sp = spp;
        } else {
            sp = new egret.Shape();
        }

        if(linestyle >= 0) {
            sp.graphics.lineStyle(1,linestyle);
        }
        if(fill >= 0) {
            sp.graphics.beginFill(fill);
        }
        sp.graphics.drawRoundRect(x,y,w,h,wr,hr);
        sp.graphics.endFill();
        return sp;
    }
    public getSp(w: number,h: number,x: number,y: number,color:number):egret.Shape{
        var sp: egret.Shape=new egret.Shape();
        sp.graphics.beginFill(color);
        sp.graphics.drawRect(x,y,w,h);
        sp.graphics.endFill();
        return sp;
    }
    public getTextLenChar(text:string):number{
        var len: number = 0;
        for(var i = 0;i < text.length;i++) {
            var length = text.charCodeAt(i);
            if(length >= 0 && length <= 255) {
                len += 1;
            } else if(window["isChinese"](text.charAt(i))){
                len+=2
            }
            else {
                len += 2;
            }
        }
        return len;
    }
    public getStringLen(str,_len:number): string {
        var len = 0;
        var newStr = '';
        for(var i = 0;i < str.length;i++) {
            var length = str.charCodeAt(i);
            if(length >= 0 && length <= 255) {
                len += 1;
            }
            else {
                len += 2;
            }
            if(len < _len) {
                newStr += str[i];
            } else {
                newStr += '...';
                return newStr;
            }
        }
        return newStr;
    }
//    //得到圆形图片
//    public getCricleBitbmp(img:egret.Bitmap,masksrc:string):egret.Bitmap{
//        var ret: egret.Bitmap;
//        var content: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
//        content.addChild(img);
//        var textTrue: egret.Texture = RES.getRes(masksrc);
//        var mask: egret.Bitmap = new egret.Bitmap(textTrue);
//        var maskX: number = 0;
//        var maskY: number = 0;
//        var maskW:number = mask.width;
//        var maskH:number = mask.height;
//        mask.blendMode = egret.BlendMode.ERASE_REVERSE;
//        content.addChild(mask);
//        var texture = new egret.RenderTexture();
//        texture.drawToTexture(content, new egret.Rectangle(maskX, maskY, maskW, maskH));
//        ret = new egret.Bitmap(texture);
//        return ret;
//    }
}
    