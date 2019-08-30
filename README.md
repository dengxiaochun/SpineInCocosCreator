# Spine 骨骼动画在Cocos Creator中的应用

本实例基于[CocosCreator v2.0.9](https://www.cocos.com/creator),[spine runtime v3.6](https://github.com/EsotericSoftware/spine-runtimes/tree/3.6)示例项目

因creator暴露出来的骨骼动画接口不多，增加了creator.d.ts中的Skeleton类的属性，而且添加了spine-core.d.ts。

实例中有3个场景，可切换场景
## spineboy 
基本动画和过渡效果，还有手动更改插槽中的附件实现表情更换

## hero
更换皮肤和装备功能

## IKConstraints
动画分层和路径约束功能

