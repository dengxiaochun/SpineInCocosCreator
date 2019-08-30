const {ccclass, property} = cc._decorator;
const EventType = cc.Node.EventType;
let p = cc.Vec2.ZERO;

@ccclass
export default class NewClass extends cc.Component {
    
    onLoad() {
        this.node.on(EventType.TOUCH_START,this.eventCall.bind(this))
        this.node.on(EventType.TOUCH_MOVE,this.eventCall.bind(this))
        this.node.on(EventType.TOUCH_CANCEL,this.eventCall.bind(this))
        this.node.on(EventType.TOUCH_END,this.eventCall.bind(this))
    }

    eventCall(event:cc.Event.EventTouch) {
        let pos
        switch (event.type) {
            case EventType.TOUCH_START:
                pos = this.node.parent.convertToNodeSpaceAR(event.getLocation())
                p = pos.sub(this.node.position)
                break;
            case EventType.TOUCH_MOVE:
                pos = this.node.parent.convertToNodeSpaceAR(event.getLocation())
                this.node.position = pos.sub(p)
                let ec = new cc.Event.EventCustom('DragMove',true)
                ec.setUserData(event.getLocation())
                this.node.dispatchEvent(ec)
                break;
            case EventType.TOUCH_END:
                break;
            case EventType.TOUCH_CANCEL:
                break;
            default:
                break;
        }
    }
}
