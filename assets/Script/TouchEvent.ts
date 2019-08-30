const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchEvent extends cc.Component {
    @property(cc.Boolean)
    locationInfo:boolean = false;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START,this.eventCall.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.eventCall.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.eventCall.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_END,this.eventCall.bind(this))
    }

    eventCall(event:cc.Touch) {
        if (this.locationInfo) cc.log(event.getLocation())
    }


}
