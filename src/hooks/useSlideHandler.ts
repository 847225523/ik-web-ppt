import { useSelector, useDispatch } from 'react-redux'
import { createRandomCode } from '@/utils/common'
import { Slide } from '@/types/slides'
import { updateSlideIndex, setSlides, addSlides, updateSlides, deleteSlides } from '@/store/slidesReducer'

const useSlideHandler = () => {

  const slidesList = useSelector((state: any) => state.slides.slides)
  const slideIndex = useSelector((state: any) => state.slides.slideIndex)
  const theme = useSelector((state: any) => state.slides.theme)
  const dispatch = useDispatch()

  // const { pasteTextClipboardData, addSlidesFromClipboard } = usePasteTextClipboardData()


  // 创建一页空白页并添加到下一页
  const createSlide = () => {
    const emptySlide: Slide = {
      id: createRandomCode(8),
      elements: [],
      background: {
        type: 'solid',
        color: theme.backgroundColor,
      },
    }
    dispatch(addSlides(emptySlide))
    // mainStore.setActiveElementIdList([])
    // slidesStore.addSlide(emptySlide)
    // addHistorySnapshot()
  }

   // 重置幻灯片
   const resetSlides = () => {
    const emptySlide: Slide = {
      id: createRandomCode(8),
      elements: [],
      background: {
        type: 'solid',
        color: theme.backgroundColor,
      },
    }
    dispatch(updateSlideIndex(0))
    // mainStore.setActiveElementIdList([])
    dispatch(setSlides([emptySlide]))
  }

  // 删除当前页，若将删除全部页面，则执行重置幻灯片操作
  const deleteSlide = (targetSlidesId: number | string) => {
    dispatch(deleteSlides(targetSlidesId))
    // addHistorySnapshot()
  }

  const updateSlidesList = (slidesList: Slide[]) => {
    dispatch(setSlides(slidesList))
  }

  // 将当前页复制一份到下一页
  // const copyAndPasteSlide = () => {
  //   const slide = JSON.parse(JSON.stringify(currentSlide.value))
  //   addSlidesFromClipboard([slide])
  // }

  return {
    createSlide,
    resetSlides,
    deleteSlide,
    updateSlidesList
  }
}

export default useSlideHandler