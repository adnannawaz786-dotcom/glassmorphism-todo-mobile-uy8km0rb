import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit2, Trash2, X } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 mb-3 shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      <div className="relative flex items-center gap-3">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 touch-manipulation ${
            todo.completed
              ? 'bg-gradient-to-r from-green-400 to-blue-500 border-transparent'
              : 'border-white/40 hover:border-white/60'
          }`}
        >
          <AnimatePresence>
            {todo.completed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check size={14} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Todo content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              autoFocus
              className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-base font-medium"
              placeholder="Enter todo..."
            />
          ) : (
            <motion.span
              className={`block text-base font-medium transition-all duration-300 ${
                todo.completed
                  ? 'text-white/60 line-through'
                  : 'text-white'
              }`}
            >
              {todo.text}
            </motion.span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <AnimatePresence>
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEdit}
                  className="p-2 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors touch-manipulation"
                >
                  <Check size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="p-2 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors touch-manipulation"
                >
                  <X size={16} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors touch-manipulation"
                >
                  <Edit2 size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(todo.id)}
                  className="p-2 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors touch-manipulation"
                >
                  <Trash2 size={16} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile-optimized touch indicator */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-active:ring-white/30 transition-all duration-150 pointer-events-none" />
    </motion.div>
  );
};

export default TodoItem;