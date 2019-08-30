const {ccclass, property} = cc._decorator;
let mouthIndex = 1;
let eyeIndex = 1;

@ccclass
export default class spineboy extends cc.Component {

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
        
        this.sp_state_data.defaultMix = 0.3;

        cc.director.preloadScene('hero')
    }

    switchAnimation(event:cc.Event,aniName:string) {
        cc.log('aniName1',aniName)
        this.sp.setAnimation(0,aniName,true)
    }

    changMouth() {
        
        const attachments = [
            'mouth-smile',
            'mouth-grind',
            'mouth-oooo',
        ]
            
        let slot = this.sp.findSlot('mouth')
        this.sp.setAttachment('mouth',attachments[(mouthIndex++)%3])
    }

    changEye() {
        const attachments = [
            'eye-indifferent',
            'eye-surprised',
        ]   
        this.sp.setAttachment('eye',attachments[(eyeIndex++)%2])
    }

    nextScene() {
        cc.director.loadScene('hero')
    }
}
