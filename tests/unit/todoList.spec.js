// import mount
import { mount } from "@vue/test-utils"

import Todo from '../../src/components/Todo.vue';
import TodoList from '../../src/components/TodoList.vue';
import App from '../../src/App.vue';

describe('TodoList.vue', () => {
  test('Multiple todo items are rendered correctly', () => {
    
    const todoItems = [
        {
            "title": "example title 1",
            "notes": "example notes 1",
            "completed": false,
        },
        {
            "title": "example title 2",
            "notes": "example notes 2",
            "completed": false,
        },
    ];

    const wrapper = mount(TodoList, {
      propsData: {
        todos: todoItems
      }
    });

    // ensure that first todo item is rendered correctly
    expect(wrapper.html().includes(todoItems[0].title))
    expect(wrapper.html().includes(todoItems[0].notes))
    expect(wrapper.html().includes(todoItems[0].completed))

    // ensure 2nd todo item is rendered correctly
    expect(wrapper.html().includes(todoItems[1].title))
    expect(wrapper.html().includes(todoItems[1].notes))
    expect(wrapper.html().includes(todoItems[1].completed))
  });

  test('Single todo item is rendered correctly', () => {
    
    const todoItems = [
        {
            "title": "example title 1",
            "notes": "example notes 1",
            "completed": false,
        },
    ];

    const wrapper = mount(TodoList, {
      propsData: {
        todos: todoItems
      }
    });

    // ensure that first todo item is rendered correctly
    expect(wrapper.html().includes(todoItems[0].title))
    expect(wrapper.html().includes(todoItems[0].notes))
    expect(wrapper.html().includes(todoItems[0].completed))
  });

  test('Completed todo item is not shown', () => {
    
    const todoItems = [
        {
            "title": "example title 1",
            "notes": "example notes 1",
            "completed": true,
        },
    ];

    const wrapper = mount(TodoList, {
      propsData: {
        todos: todoItems
      }
    });

    // ensure that first todo item is rendered correctly
    expect(! wrapper.html().includes(todoItems[0].title))
    expect(! wrapper.html().includes(todoItems[0].notes))
    expect(! wrapper.html().includes(todoItems[0].completed))
  });

  test('Single todo item is rendered correctly when 2nd todo item is completed', () => {
    
    const todoItems = [
        {
            "title": "example title 1",
            "notes": "example notes 1",
            "completed": true,
        },
        {
          "title": "example title 2",
          "notes": "example notes 2",
          "completed": false
      },
    ];

    const wrapper = mount(TodoList, {
      propsData: {
        todos: todoItems
      }
    });

    // ensure that 1st todo item is not present
    expect(! wrapper.html().includes(todoItems[0].title))
    expect(! wrapper.html().includes(todoItems[0].notes))
    expect(! wrapper.html().includes(todoItems[0].completed))

    // ensure that 2nd todo item is rendered
    expect(wrapper.html().includes(todoItems[1].title))
    expect(wrapper.html().includes(todoItems[1].notes))
    expect(wrapper.html().includes(todoItems[1].completed))
  });
});
