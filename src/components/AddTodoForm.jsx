import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text.trim())
      setText('')
      setIsExpanded(false)
    }
  }

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    if (!text.trim()) {
      setIsExpanded(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 p-4 backdrop-blur-xl bg-white/10 border-b border-white/20"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg"
          animate={{
            height: isExpanded ? 'auto' : '56px'
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center p-4">
            <motion.div
              className="flex-shrink-0 mr-3"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Add a new todo..."
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-base font-medium"
              autoComplete="off"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0
            }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
            className="px-4 pb-4"
          >
            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={() => {
                  setText('')
                  setIsExpanded(false)
                }}
                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/70 text-sm font-medium backdrop-blur-sm"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={!text.trim()}
                className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: text.trim() ? 0.95 : 1 }}
                whileHover={{ scale: text.trim() ? 1.02 : 1 }}
                transition={{ duration: 0.1 }}
              >
                Add Todo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating action button for mobile */}
        {!isExpanded && (
          <motion.button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg md:hidden"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Plus className="w-4 h-4 text-white" />
          </motion.button>
        )}
      </motion.form>
    </motion.div>
  )
}