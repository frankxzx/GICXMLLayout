//
//  GICSizeConverter.h
//  GICXMLLayout
//
//  Created by 龚海伟 on 2018/7/11.
//


#import "GICValueConverter.h"
@interface GICSizeConverter : GICValueConverter
-(NSValue *)convert:(NSString *)xmlStringValue;
-(NSValue *)convertAnimationValue:(NSValue *)from to:(NSValue *)to per:(CGFloat)per;
@end
