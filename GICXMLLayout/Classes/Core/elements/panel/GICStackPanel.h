//
//  GICStackPanel.h
//  GICXMLLayout
//
//  Created by 龚海伟 on 2018/7/2.
//

#import "GICPanel.h"

/**
 box 布局
 StackPanel 的子元素都应该指定高度。(lable 和 其他panel 可以无需指定高度，因为这些元素可以自动计算高度)
 */
@interface GICStackPanel : GICPanel{
//    ASStackLayoutSpec *stackLayoutSpec;
    NSMutableDictionary<NSString *,id> *stackPanelPropertyDict;
}
@property (nonatomic,assign)BOOL isHorizon;
@end
