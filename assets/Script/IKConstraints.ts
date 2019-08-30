const {ccclass, property} = cc._decorator;

var aimTrack = 1;
var shootAimTrack = 2;
var shootTrack = 3;
var isAim = false;
var controlBones = ["hoverboard controller", "hip controller", "board target", "crosshair"];

@ccclass
export default class IKConstraints extends cc.Component {
    /**
     * creator骨骼组件
     */
    sp:sp.Skeleton = null;

    /**
     * spine 骨骼实例
     * sp.spine.Skeleton
     */
    sp_skeleton:spine.Skeleton = null;

    /**
     * spine 骨骼数据实例
     * sp.spine.SkeletonData
     */
    sp_skeleton_data:spine.SkeletonData = null;

    /**
     * spine 动画状态类
     * sp.spine.AnimationState
     */
    sp_state:spine.AnimationState = null;

    /**
     * spine 动画状态数据类
     * sp.spine.AnimationStateData
     */
    sp_state_data:spine.AnimationStateData = null;

    onLoad() {
    
        this.sp = this.getComponent(sp.Skeleton)
        this.sp_skeleton = this.sp._skeleton;
        this.sp_skeleton_data = this.sp._skeleton.data;
        this.sp_state = this.sp.getState();
        this.sp_state_data = this.sp_state.data;
        
        this.node.on('DragMove',this.dragBone.bind(this))
        this.sp.setAnimation(0,'hoverboard',true)
        this.init()
        cc.director.preloadScene('spineboy')
    }

    /**
     * 初始化附着骨骼控制子节点
     */
    init() {
        const children = this.node.children;
        for (let index = 0; index < controlBones.length; index++) {
            const name = controlBones[index];
            let bone:spine.Bone = this.sp.findBone(name)
            children[index].x = bone.x;
            children[index].y = bone.y;
            children[index].name = name;
        }
    }

    /**
     * 设置两种调式模式
     * set Bones or slots DebugMode
     * @param toggle 
     * @param debugName 
     */
    setDebug(toggle:cc.Toggle,debugName:string) {
        if (debugName == 'bone') {
            this.sp.debugBones = toggle.isChecked;
        } else {
            this.sp.debugSlots = toggle.isChecked;
        }
    }

    /**
     * 这是附着在骨骼控制子节点组件DragTool传来的拖动事件，用来更新骨骼位置
     * @param event 
     */
    dragBone(event:cc.Event.EventCustom) {
        event.stopPropagation()
        let p = event.detail;
        let p2 = this.node.convertToNodeSpaceAR(p)
        
        let hcBone:spine.Bone = this.sp.findBone(event.target.name)
        if (hcBone.parent != null) {
            // 这里是提示文件报错，不影响使用，试过改了也没用
            hcBone.parent.worldToLocal(new sp.spine.Vector2(p2.x,p2.y))
            hcBone.x = p2.x;
            hcBone.y = p2.y
        } else {
            cc.log('no parent')
            hcBone.x = p2.x;
            hcBone.y = p2.y
        }
    }

    /**
     * 分层动画，瞄准
     * 
     * @param toggle 
     */
    aim(toggle:cc.Toggle) {
        isAim = toggle.isChecked;
        if (toggle.isChecked) {
            this.sp_state.setEmptyAnimation(aimTrack, 0);
            let entry = this.sp.addAnimation(aimTrack,'aim',true)
            entry.mixDuration = 0.2;
            cc.log('entry',entry)
        } else {
            this.sp_state.setEmptyAnimation(aimTrack, 0.2);
        }
    }

    /**
     * 分层动画 先瞄准再射击
     * 
     */
    shoot() {
        this.sp_state.setEmptyAnimation(shootAimTrack,0)
        this.sp.addAnimation(shootAimTrack,'aim',false).mixDuration = 0.2
        this.sp_state.setEmptyAnimation(shootTrack,0)
        let entry = this.sp.addAnimation(shootTrack,"shoot",false,0.2)
        entry.mixDuration = 0.2
        entry.listener = {
            complete:()=>{
                cc.log('shoot over')
                this.sp_state.setEmptyAnimation(shootAimTrack,0.2)
                this.sp.clearTrack(shootTrack)
            }
        }
    }
    /**
     * 分层动画 跳跃，跟瞄准动画一个层级
     * 
     */
    jump() {
       this.sp_state.setAnimation(aimTrack,'jump',false);
       this.sp_state.addEmptyAnimation(aimTrack,0.5,0)
       if (isAim) {
           this.sp_state.addAnimation(aimTrack,"aim",true,0.4).mixDuration = 0.2;
       }
    }


    nextScene() {
        cc.director.loadScene('spineboy')
    }
}
