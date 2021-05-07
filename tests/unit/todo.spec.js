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
  it('emits delete-todo', () => {
    let todoItem = {
      'id': 'e48d5ebb-0e8e-4d1e-9bee-228a2979baf2',
      'notes': 'Example notes',
      'completed': false,
      'title': 'Example title',
    };

    const wrapper = mount(Todo, {
      propsData: {
        todo: todoItem
      }
    });
    
    wrapper.findComponent().trigger('click')
    wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toBeTruthy()
  })
});
