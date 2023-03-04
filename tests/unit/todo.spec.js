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
      'id': 3,
      'notes': 'Example notes',
      'completed': false,
      'title': 'Example title',
    };

    const wrapper = mount(Todo, {
      propsData: {
        todo: todoItem
      }
    });
    
    let btn = wrapper.find('button#3.del.waves-effect.waves-light.btn');
    expect(btn.exists()).toBe(true)

    btn.trigger('click');
    wrapper.vm.$nextTick()
    expect(wrapper.emitted('delete-todo')).toBeTruthy();
    expect(wrapper.emitted('delete-todo')[0]).toContainEqual(todoItem);
  })
  it('emits complete-todo', () => {
    let todoItem = {
      'id': 4,
      'notes': 'Example notes',
      'completed': false,
      'title': 'Example title',
    };

    const wrapper = mount(Todo, {
      propsData: {
        todo: todoItem
      }
    });
    
    const completeBtn = wrapper.findComponent('button#4.complete.waves-effect.waves-light.btn')
    expect(completeBtn.exists()).toBe(true)

    btn.trigger('click');
    wrapper.vm.$nextTick()
    expect(wrapper.emitted('complete-todo')).toBeTruthy();
    expect(wrapper.emitted('complete-todo')[0]).toContainEqual(todoItem);
  })
});
