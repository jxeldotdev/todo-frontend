// import mount
import { mount } from "@vue/test-utils"
import Todo from '@/components/Todo.vue';

describe('Todo', () => {
  it('renders a todo item', () => {
    const todoItem = {
      'notes': 'Example notes',
      'completed': false,
      'title': 'Example title',
    };
    
    const wrapper = mount(Todo, {
      propsData: {
        todo: todoItem
      }
    });

    expect(wrapper.text()).toContain('Example notes');
    expect(wrapper.find('.todo-title').exists(true));
    expect(wrapper.text()).toContain('Example title');
  });
});
