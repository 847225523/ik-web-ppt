/**
 * 幻灯片背景
 *
 * type: 背景类型（纯色、图片、渐变）
 *
 * color?: 背景颜色（纯色）
 *
 * image?: 图片地址（图片）
 *
 * imageSize?: 图片填充方式
 *
 * gradientType?: 渐变类型（线性、径向）
 *
 * gradientColor?: 渐变颜色
 *
 * gradientRotate?: 渐变角度（线性）
 */
export interface SlideBackground {
  type: "solid" | "image" | "gradient"
  color?: string
  image?: string
  imageSize?: "cover" | "contain" | "repeat"
  gradientType?: "linear" | "radial"
  gradientColor?: [string, string]
  gradientRotate?: number
}

/**
 * 元素动画
 *
 * elId: 元素ID
 *
 * type: 动画类型
 *
 * duration: 动画持续时间
 */
export interface PPTAnimation {
  elId: string
  type: string
  duration: number
}

export type TurningMode = "no" | "fade" | "slideX" | "slideY"

/**
 * 幻灯片页面
 *
 * id: 页面ID
 *
 * elements: 元素集合
 *
 * remark?: 备注
 *
 * background?: 页面背景
 *
 * animations?: 元素动画集合
 *
 * turningMode?: 翻页方式
 */
export interface Slide {
  id: string
  elements: PPTElement[]
  remark?: string
  background?: SlideBackground
  animations?: PPTAnimation[]
  turningMode?: TurningMode
}

export const enum ElementTypes {
  TEXT = "text",
  IMAGE = "image",
  SHAPE = "shape",
  LINE = "line",
  TABLE = "table",
  LATEX = "latex",
  VIDEO = "video",
  AUDIO = "audio",
}

/**
 * 元素阴影
 *
 * h: 水平偏移量
 *
 * v: 垂直偏移量
 *
 * blur: 模糊程度
 *
 * color: 阴影颜色
 */
export interface PPTElementShadow {
  h: number
  v: number
  blur: number
  color: string
}

/**
 * 元素边框
 *
 * style?: 边框样式（实线或虚线）
 *
 * width?: 边框宽度
 *
 * color?: 边框颜色
 */
export interface PPTElementOutline {
  style?: "dashed" | "solid"
  width?: number
  color?: string
}

/**
 * 元素超链接
 *
 * type: 链接类型（网页、幻灯片页面）
 *
 * target: 目标地址（网页链接、幻灯片页面ID）
 */
export interface PPTElementLink {
  type: "web" | "slide"
  target: string
}

/**
 * 元素通用属性
 *
 * id: 元素ID
 *
 * left: 元素水平方向位置（距离画布左侧）
 *
 * top: 元素垂直方向位置（距离画布顶部）
 *
 * lock?: 锁定元素
 *
 * groupId?: 组合ID（拥有相同组合ID的元素即为同一组合元素成员）
 *
 * width: 元素宽度
 *
 * height: 元素高度
 *
 * rotate: 旋转角度
 *
 * link?: 超链接
 */
interface PPTBaseElement {
  id: string
  left: number
  top: number
  lock?: boolean
  groupId?: string
  width: number
  height: number
  rotate: number
  link?: PPTElementLink
}

/**
 * 文本元素
 *
 * type: 元素类型（text）
 *
 * content: 文本内容（HTML字符串）
 *
 * defaultFontName: 默认字体（会被文本内容中的HTML内联样式覆盖）
 *
 * defaultColor: 默认颜色（会被文本内容中的HTML内联样式覆盖）
 *
 * outline?: 边框
 *
 * fill?: 填充色
 *
 * lineHeight?: 行高（倍），默认1.5
 *
 * wordSpace?: 字间距，默认0
 *
 * opacity?: 不透明度，默认1
 *
 * shadow?: 阴影
 */
export interface PPTTextElement extends PPTBaseElement {
  type: "text"
  content: string
  defaultFontName: string
  defaultColor: string
  outline?: PPTElementOutline
  fill?: string
  lineHeight?: number
  wordSpace?: number
  opacity?: number
  shadow?: PPTElementShadow
  fontSize?: string
  textDecoration?: string
  fontStyle?: string
  fontWeight?: number
}

/**
 * 图片滤镜
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter
 *
 * 'blur'?: 模糊，默认0（px）
 *
 * 'brightness'?: 亮度，默认100（%）
 *
 * 'contrast'?: 对比度，默认100（%）
 *
 * 'grayscale'?: 灰度，默认0（%）
 *
 * 'saturate'?: 饱和度，默认100（%）
 *
 * 'hue-rotate'?: 色相旋转，默认0（deg）
 *
 * 'opacity'?: 不透明度，默认100（%）
 */
export interface ImageElementFilters {
  blur?: string
  brightness?: string
  contrast?: string
  grayscale?: string
  saturate?: string
  "hue-rotate"?: string
  opacity?: string
}

/**
 * 图片裁剪
 *
 * range: 裁剪范围，例如：[[10, 10], [90, 90]] 表示裁取原图从左上角 10%, 10% 到 90%, 90% 的范围
 *
 * shape: 裁剪形状，见 configs/imageClip.ts CLIPPATHS
 */
export interface ImageElementClip {
  range: [[number, number], [number, number]]
  shape: string
}

/**
 * 图片元素
 *
 * type: 元素类型（image）
 *
 * fixedRatio: 固定图片宽高比例
 *
 * src: 图片地址
 *
 * outline?: 边框
 *
 * filters?: 图片滤镜
 *
 * clip?: 裁剪信息
 *
 * flipH?: 水平翻转
 *
 * flipV?: 垂直翻转
 *
 * shadow?: 阴影
 */
export interface PPTImageElement extends PPTBaseElement {
  type: "image"
  fixedRatio: boolean
  src: string
  outline?: PPTElementOutline
  filters?: ImageElementFilters
  clip?: ImageElementClip
  flipH?: boolean
  flipV?: boolean
  shadow?: PPTElementShadow
}

export type PPTElement = PPTTextElement | PPTImageElement

/**
 * 元素边框
 *
 * style?: 边框样式（实线或虚线）
 *
 * width?: 边框宽度
 *
 * color?: 边框颜色
 */
export interface PPTElementOutline {
  style?: "dashed" | "solid"
  width?: number
  color?: string
}

/**
 * 元素阴影
 *
 * h: 水平偏移量
 *
 * v: 垂直偏移量
 *
 * blur: 模糊程度
 *
 * color: 阴影颜色
 */
export interface PPTElementShadow {
  h: number
  v: number
  blur: number
  color: string
}

/**
 * 幻灯片主题
 *
 * backgroundColor: 页面背景颜色
 *
 * themeColor: 主题色，用于默认创建的形状颜色等
 *
 * fontColor: 字体颜色
 *
 * fontName: 字体
 */
export interface SlideTheme {
  backgroundColor: string
  themeColor: string
  fontColor: string
  fontName: string
}

export type LinePoint = "" | "arrow" | "dot"

/**
 * 线条元素
 *
 * type: 元素类型（line）
 *
 * start: 起点位置（[x, y]）
 *
 * end: 终点位置（[x, y]）
 *
 * style: 线条样式（实线、虚线）
 *
 * color: 线条颜色
 *
 * points: 端点样式（[起点样式, 终点样式]，可选：无、箭头、圆点）
 *
 * shadow?: 阴影
 *
 * broken?: 折线中点位置（[x, y]）
 *
 * curve?: 曲线中点位置（[x, y]）
 */
export interface PPTLineElement
  extends Omit<PPTBaseElement, "height" | "rotate"> {
  type: "line"
  start: [number, number]
  end: [number, number]
  style: "solid" | "dashed"
  color: string
  points: [LinePoint, LinePoint]
  shadow?: PPTElementShadow
  broken?: [number, number]
  curve?: [number, number]
}
