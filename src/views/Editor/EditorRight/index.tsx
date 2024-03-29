import { useMemo, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { elementTabs, slideTabs } from "./config"
import StylePanel from "./components/StylePanel"
import SlidePanel from "./components/SlideStylePanel"
import classnames from "classnames"
import { updateSlides } from "@/store/slidesReducer"
import "./index.scss"

const EditorRight = () => {
  const dispatch = useDispatch()

  const activeElementIdList = useSelector(
    (state: any) => state.canvas.activeElementIdList
  )

  const slides = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)

  const [curTab, setCurTab] = useState<string>("")

  // 根据当前聚焦组件状态判断是看板还是组件
  const currentTabs = useMemo(() => {
    if (!activeElementIdList.length) {
      return slideTabs
    }
    return elementTabs
  }, [activeElementIdList])

  useEffect(() => {
    setCurTab(currentTabs[0].value)
  }, [currentTabs])

  const handleChangeTab = (tab: string) => {
    setCurTab(tab)
  }

  const handleSlideSetting = (props: { [key: string]: string }) => {
    dispatch(updateSlides(props))
    console.log(props)
  }

  // 获取对应tab下的配置组件
  const currentPanelComponent = () => {
    let component = null
    switch (curTab) {
      case "el_style":
        component = <StylePanel />
        break
      case "el_position":
        component = <div>el_position</div>
        break
      case "slide_style":
        component = (
          <SlidePanel
            slideInfo={slides[slideIndex]}
            onSlideSetting={handleSlideSetting}
          />
        )
        break
      case "slide_animate":
        component = <div>slide_animate</div>
        break
      default:
        component = <div>404</div>
    }

    return component
  }

  /** tabs render */
  const tabListRender = useMemo(() => {
    return (
      <div className="tab-list">
        {currentTabs.map((i) => {
          return (
            <div
              className={classnames("tab", { active: curTab === i.value })}
              key={i.label}
              onClick={() => handleChangeTab(i.value)}
            >
              {i.label}
            </div>
          )
        })}
      </div>
    )
  }, [currentTabs, curTab])

  return (
    <div className="content-right">
      {tabListRender}
      <div className="content">{currentPanelComponent()}</div>
    </div>
  )
}

export default EditorRight
