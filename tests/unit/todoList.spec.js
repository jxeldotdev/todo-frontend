// import mount
import { shallowMount } from "@vue/test-utils"

import Todo from '../../src/components/Todo.vue';
import TodoList from '../../src/components/TodoList.vue';
import App from '../../src/App.vue';

describe('App', () => {
  it('Renders App', () => {
    
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

    const wrapper = shallowMount(App, {
      propsData: {
        todos: todoItems
      }
    });

    console.log(wrapper.text);

    expect(wrapper.text()).toContain("example title 1");
    expect(wrapper.text()).toContain("example title 2");
  });
});
