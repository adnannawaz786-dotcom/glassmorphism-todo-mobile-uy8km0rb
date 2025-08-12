import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, X, Edit2 } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('glassmorphism-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('glassmorphism-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editValue.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyPress = (e, action, id = null) => {
    if (e.key === 'Enter') {
      if (action === 'add') {
        addTodo();
      } else if (action === 'edit' && id) {
        saveEdit(id);
      }
    }
    if (e.key === 'Escape' && action === 'edit') {
      cancelEdit();
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Glass Todo
          </h1>
          <p className="text-white/70">
            {activeCount} active, {completedCount} completed
          </p>
        </motion.div>

        {/* Glass Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-xl overflow-hidden"
        >
          {/* Add Todo Input */}
          <div className="p-6 border-b border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'add')}
                placeholder="Add a new todo..."
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addTodo}
                className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-2xl p-3 transition-all duration-200 active:scale-95"
              >
                <Plus className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-white/10">
            {['all', 'active', 'completed'].map((filterType) => (
              <motion.button
                key={filterType}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(filterType)}
                className={`flex-1 py-4 px-6 text-sm font-medium capitalize transition-all duration-200 ${
                  filter === filterType
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {filterType}
              </motion.button>
            ))}
          </div>

          {/* Todo List */}
          <div className="max-h-96 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center text-white/50"
                >
                  {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
                </motion.div>
              ) : (
                filteredTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <div className="p-4 flex items-center gap-3">
                      {/* Complete Button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                          todo.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-white/30 hover:border-white/50'
                        }`}
                      >
                        {todo.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                          >
                            <Check className="w-4 h-4 text-white mx-auto" />
                          </motion.div>
                        )}
                      </motion.button>

                      {/* Todo Text */}
                      <div className="flex-1">
                        {editingId === todo.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, 'edit', todo.id)}
                            onBlur={() => saveEdit(todo.id)}
                            autoFocus
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                          />
                        ) : (
                          <motion.span
                            layout
                            className={`text-white transition-all duration-200 ${
                              todo.completed
                                ? 'line-through opacity-50'
                                : ''
                            }`}
                            onDoubleClick={() => startEditing(todo.id, todo.text)}
                          >
                            {todo.text}
                          </motion.span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {editingId === todo.id ? (
                          <>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => saveEdit(todo.id)}
                              className="p-2 text-green-400 hover:text-green-300 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={cancelEdit}
                              className="p-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </>
                        ) : (
                          <>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => startEditing(todo.id, todo.text)}
                              className="p-2 text-white/50 hover:text-white/70 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteTodo(todo.id)}
                              className="p-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-white/50 text-sm"
          >
            Double-tap to edit • Swipe for more options
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TodoApp;