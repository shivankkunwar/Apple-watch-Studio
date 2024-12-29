import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useAppDispatch } from '@/lib/hooks'
import { setLanding } from '@/store/slices/uiSlice'

export default function LandingPage() {
    const dispatch = useAppDispatch()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: {
          duration: 0.5,
          ease: 'easeInOut',
          delay: 0.3,
        },
      }}
      className="absolute  top-[17%] left-4 right-4 z-10 max-w-[87.5%] mx-auto my-0 inset-0 flex items-start justify-start  lg:items-top lg:justify-center lg:left-0 lg:right-0"
    >
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 text-left bg-[#fffc]"
        >
          <h1 className="text-2xl font-semibold sm:font-normal sm:text-xl landingPageT1">Apple Watch Studio</h1>
          <div className="space-y-1 text-4xl md:text-6xl font-semibold landingPageT2">
            <p>Choose a case.</p>
            <p>Pick a band.</p>
            <p>Create your own style.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='text-left'
        >
          <Button
            size="lg"
            className='bg-[#0071e3] hover:bg-[#0071e3] px-4 sm:px-6 rounded-full text-white font-proDisplayRegular text-[14px] sm:text-[18px] hover:'
            onClick={() => dispatch(setLanding(false))}
         
          >
            Get started
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
