import Util from "./Util";

const {ccclass, property} = cc._decorator;
let lastNum = -1;
let lastAni = -1;
let clickAnim = 0;
let eqipNum = 0;
@ccclass
export default class hero extends cc.Component {
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

        cc.director.preloadScene('IKConstraints')
    }

    switchSkin() {
        let skins = this.sp_skeleton_data.skins
        let index = Util.randomExclude(1,skins.length - 1,lastNum)
        lastNum = index;
        let skin = skins[index]
        cc.log('切换皮肤',skin.name)
        this.sp.setSkin(skin.name)
    }

    switchAni() {
        let anis = this.sp_skeleton_data.animations;
        let index = Util.randomExclude(1,anis.length - 1,lastAni)
        lastAni = index;
        let ani = anis[index]
        cc.log('切换动画',ani.name)
        this.sp.setAnimation(0,ani.name,true)
    }

    swingSword() {
        this.sp.setAnimation(5, (clickAnim++ % 2 == 0) ? "meleeSwing2" : "meleeSwing1", false);
    }

    equipSword() {
        if (eqipNum == 0) {
            eqipNum = Util.random(1,3)
            const sword = ['sword_1','sword_2_swing','sword_3_bigSwing']
            this.sp.setAttachment('item_near',sword[eqipNum - 1])
        } else {
            this.sp.setAttachment('item_near',null)
            eqipNum = 0;
        }
    }

    nextScene() {
        cc.director.loadScene('IKConstraints')
    }
}
