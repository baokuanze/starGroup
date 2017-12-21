/**
 *
 * @author
 *
 */
var JsonpReq = (function () {
    function JsonpReq() {
    }
    var d = __define,c=JsonpReq,p=c.prototype;
    JsonpReq.process = function ($loader, data) {
        JsonpReq.completeCall["call_" + JsonpReq._regID] = function (data) {
            var id = JsonpReq._regID;
            $loader.data = data;
            $loader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            delete JsonpReq.completeCall["call_" + id];
        };
        JsonpReq.startLoader($loader, JsonpReq._regID++, data);
    };
    JsonpReq.startLoader = function (loader, id, data) {
        var script = document.createElement('script');
        script.src = loader._request.url + "JsonpReq.completeCall.call_" + id + "" + data;
        document.body.appendChild(script);
    };
    JsonpReq._regID = 0;
    JsonpReq.completeCall = {};
    return JsonpReq;
}());
egret.registerClass(JsonpReq,'JsonpReq');
